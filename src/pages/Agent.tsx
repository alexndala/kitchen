import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI, Type, FunctionDeclaration, Modality } from "@google/genai";
import { ArrowLeft, Send, Image as ImageIcon, BriefcaseBusiness, X } from "lucide-react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";

type LedgerEntry = {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
};

type Message = {
  id: string;
  role: "user" | "model";
  text?: string;
  imageUrl?: string;
  isLoading?: boolean;
};

export default function Agent() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "model", text: "Sawubona! I'm your Uncedo Agent. Tell me what you bought or sold today, or ask me to generate a marketing image for your products." }
  ]);
  const [input, setInput] = useState("");
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const hustleScore = ledger.length > 0 
    ? Math.min(850, 300 + ledger.reduce((acc, curr) => acc + (curr.type === "income" ? curr.amount * 0.1 : 0), 0)) 
    : "---";

  const totalIncome = ledger.filter(l => l.type === "income").reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = ledger.filter(l => l.type === "expense").reduce((acc, curr) => acc + curr.amount, 0);
  const netProfit = totalIncome - totalExpense;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !uploadedImage) || isTyping) return;

    const userText = input;
    const currentUploadedImage = uploadedImage;
    
    setInput("");
    setUploadedImage(null);
    
    const newMessageId = Date.now().toString();
    setMessages(prev => [...prev, { 
      id: newMessageId, 
      role: "user", 
      text: userText, 
      imageUrl: currentUploadedImage || undefined 
    }]);
    
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const recordTransaction: FunctionDeclaration = {
        name: "recordTransaction",
        description: "Record a business transaction for the entrepreneur.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, description: "'income' or 'expense'" },
            amount: { type: Type.NUMBER, description: "Amount of money" },
            description: { type: Type.STRING, description: "What was bought or sold" },
          },
          required: ["type", "amount", "description"]
        }
      };

      const generateImageAction: FunctionDeclaration = {
        name: "generateImageForMarketing",
        description: "Generate a marketing product image or flyer.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            imagePrompt: { type: Type.STRING, description: "Detailed description of the image to generate/edit" }
          },
          required: ["imagePrompt"]
        }
      };

      // Construct history for multi-turn chat (simplistic format)
      // Including image if available
      const parts: any[] = [];
      if (currentUploadedImage) {
        const base64Data = currentUploadedImage.split(',')[1];
        const mimeType = currentUploadedImage.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';
        parts.push({
          inlineData: { mimeType, data: base64Data }
        });
      }
      if (userText) {
        parts.push({ text: userText });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: { parts },
        config: {
          systemInstruction: "You are the Uncedo Agent, helping informal entrepreneurs build their Hustle Score. Be encouraging, concise, and professional but street-smart (use positive, simple language). Use the recordTransaction tool when they talk about buying/selling. Use generateImageForMarketing when they want an image created.",
          tools: [{ functionDeclarations: [recordTransaction, generateImageAction] }],
        }
      });

      let responseText = response.text || "";
      let newImageUrl = "";

      if (response.functionCalls && response.functionCalls.length > 0) {
        for (const call of response.functionCalls) {
          if (call.name === "recordTransaction") {
            const args = call.args as any;
            setLedger(prev => [{
              id: Date.now().toString() + Math.random(),
              type: args.type,
              amount: args.amount,
              description: args.description,
              date: new Date().toLocaleDateString()
            }, ...prev]);
            
            // Generate a follow up acknowledgement
            const followUp = await ai.models.generateContent({
              model: "gemini-3-flash-preview",
              contents: "A transaction was recorded: " + args.type + " of " + args.amount + " for " + args.description + ". Acknowledge this to the user cheerfully." 
            });
            responseText = followUp.text || "Recorded it successfully in your ledger, hustler!";
          } 
          else if (call.name === "generateImageForMarketing") {
            const args = call.args as any;
            responseText = "Generating your image... hold tight!";
            
            // Build contents for image gen
            const imgParts: any[] = [{ text: args.imagePrompt }];
            if (currentUploadedImage) {
               // Include the source image for editing!
               const base64Data = currentUploadedImage.split(',')[1];
               const mimeType = currentUploadedImage.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';
               imgParts.unshift({ inlineData: { mimeType, data: base64Data } });
            }

            try {
              const imgResponse = await ai.models.generateContent({
                model: "gemini-3.1-flash-image-preview",
                contents: { parts: imgParts },
                config: {
                   imageConfig: { aspectRatio: "1:1", imageSize: "1K" }
                }
              });

              for (const part of imgResponse.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                  newImageUrl = 'data:' + (part.inlineData.mimeType || 'image/png') + ';base64,' + part.inlineData.data;
                  responseText = "Here is your marketing image. Looking good!";
                }
              }
            } catch(e) {
              console.error("Image generation failed", e);
              responseText = "Sorry, I hit a snag generating that image. Could you try describing it differently?";
            }
          }
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "model",
        text: responseText,
        imageUrl: newImageUrl || undefined
      }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "model", text: "Whoops, network issue. Try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-paper w-full">
      {/* Sidebar: Ledger & Score */}
      <div className="hidden lg:flex w-1/3 border-r-4 border-ink bg-[#FAFAFA] flex-col overflow-y-auto">
        <div className="p-6 border-b-4 border-ink flex items-center justify-between bg-banana sticky top-0 z-10">
          <Link to="/" className="brutal-border brutal-shadow-sm bg-paper p-2 hover:bg-[#FAFAFA] rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="font-display text-2xl uppercase">Business Profile</div>
        </div>

        <div className="p-8 flex flex-col gap-8">
          {/* Score Card */}
          <div className="bg-paper brutal-border brutal-shadow p-6 flex flex-col items-center text-center gap-2">
            <span className="text-sm font-bold uppercase tracking-widest text-ink/70">Hustle Score</span>
            <div className="text-7xl font-display text-banana" style={{ WebkitTextStroke: "2px black" }}>
              {Math.floor(Number(hustleScore)) || hustleScore}
            </div>
            <p className="font-semibold text-sm mt-2">
              {Number(hustleScore) > 400 ? "You qualify for micro-credit!" : "Keep hustling to build your score."}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-paper brutal-border brutal-shadow-sm p-4">
              <div className="text-xs font-bold uppercase tracking-widest text-ink/70">Income</div>
              <div className="text-2xl font-display text-green">+{totalIncome}</div>
            </div>
            <div className="bg-paper brutal-border brutal-shadow-sm p-4">
              <div className="text-xs font-bold uppercase tracking-widest text-ink/70">Expenses</div>
              <div className="text-2xl font-display text-red-600">-{totalExpense}</div>
            </div>
          </div>
          <div className="bg-ink text-banana brutal-border brutal-shadow-sm p-4 text-center">
            <div className="text-xs font-bold uppercase tracking-widest opacity-80">Net Profit</div>
            <div className="text-3xl font-display mt-1">{netProfit}</div>
          </div>

          {/* Ledger List */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="font-display text-xl uppercase border-b-2 border-ink pb-2">Recent Ledger</div>
            {ledger.length === 0 ? (
              <div className="text-center text-ink/50 py-8 font-semibold italic">No transactions yet. Tell the agent!</div>
            ) : (
              ledger.map(l => (
                <div key={l.id} className="flex justify-between items-center bg-paper border-2 border-ink p-3 rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{l.description}</span>
                    <span className="text-xs text-ink/60">{l.date}</span>
                  </div>
                  <div className={"font-display text-xl " + (l.type === 'income' ? 'text-green' : 'text-red-600')}>
                    {l.type === 'income' ? '+' : '-'}{l.amount}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full bg-paper relative">
        <div className="p-4 border-b-4 border-ink lg:hidden flex items-center justify-between bg-banana">
          <Link to="/" className="brutal-border bg-paper p-2 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="font-display text-xl">UNCEDO<span className="text-paper">AI</span></div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col gap-6">
          {messages.map((m) => (
             <div key={m.id} className={"flex w-full " + (m.role === "user" ? "justify-end" : "justify-start")}>
               <div className={"max-w-[85%] md:max-w-2xl brutal-border brutal-shadow-sm p-4 text-lg font-medium " + (m.role === "user" ? "bg-banana" : "bg-white")}>
                  {m.imageUrl && (
                    <img src={m.imageUrl} alt="attached or generated" className="w-full max-w-sm rounded-lg mb-4 brutal-border" />
                  )}
                  {m.text && (
                    <div className="markdown-body prose prose-lg prose-p:leading-snug">
                      <Markdown>{m.text}</Markdown>
                    </div>
                  )}
               </div>
             </div>
          ))}
          {isTyping && (
            <div className="flex w-full justify-start">
               <div className="bg-white brutal-border brutal-shadow-sm p-4 text-xl">
                 <span className="animate-pulse">Typing...</span>
               </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 lg:p-8 bg-paper border-t-4 border-ink">
          {uploadedImage && (
             <div className="relative inline-block mb-4">
               <img src={uploadedImage} alt="upload preview" className="h-24 rounded brutal-border object-cover" />
               <button onClick={() => setUploadedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 brutal-border">
                 <X className="w-4 h-4" />
               </button>
             </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center relative">
             
             <label className="cursor-pointer bg-ink text-paper p-4 brutal-border brutal-shadow flex-shrink-0 hover:bg-ink/80 transition-colors">
                <ImageIcon className="w-6 h-6" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
             </label>
             
             <div className="flex-1 w-full relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Record 'Sold 5 bags for 200' or 'Create a poster'..."
                  className="w-full text-lg p-4 brutal-border focus:outline-none bg-[#FAFAFA]"
                />
             </div>

             <button 
               onClick={handleSend}
               disabled={isTyping}
               className="bg-banana p-4 brutal-border brutal-shadow text-ink hover:bg-banana-deep transition-colors disabled:opacity-50 flex-shrink-0"
             >
                <Send className="w-6 h-6" />
             </button>
          </div>
          <div className="mt-4 text-xs font-bold uppercase tracking-wider text-ink/50 text-center">
            AI can make mistakes. Always verify your ledger before submitting for credit.
          </div>
        </div>
      </div>
    </div>
  );
}

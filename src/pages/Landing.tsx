import CharacterCard from "@/src/components/CharacterCard";
import { Link } from "react-router-dom";
import { MoveRight, TrendingUp, Users, ShieldCheck, MessageCircle } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-paper">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-banana rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="font-display text-4xl tracking-tight">UNCEDO<span className="text-banana-deep">AI</span></div>
        <a
          href="https://wa.me/1415523886?text=join-column-means"
          target="_blank" rel="noopener noreferrer"
          className="bg-banana text-ink font-display text-xl px-8 py-3 brutal-border brutal-shadow-sm uppercase hover:bg-banana-deep"
        >
          Chat on WhatsApp
        </a>
      </nav>

      {/* Hero Section */}
      <main className="w-full max-w-[1400px] mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 xl:grid-cols-[45%_55%] gap-16 items-center relative z-10">
        <div className="flex flex-col gap-8">
          <div className="inline-block bg-ink text-paper font-bold uppercase tracking-wider text-sm px-4 py-2 w-max brutal-border">
            Your WhatsApp Business Assistant
          </div>
          <h1 className="h1-mega">
            GROW YOUR <br /> <span>BUSINESS.</span> <br /> GET CREDIT.
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-xl text-ink/80 leading-relaxed text-[#444]">
            An easy-to-use WhatsApp assistant for South African business owners. Record your cash sales, build a verifiable credit profile for loans, and get marketing support to grow your customer base. No app downloads required.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <a
              href="https://wa.me/1415523886?text=join-column-means"
              target="_blank" rel="noopener noreferrer"
              className="bg-ink text-paper font-display text-[18px] px-10 py-5 brutal-border brutal-shadow flex items-center justify-center gap-3 hover:scale-105 transition-transform rounded-[100px]"
            >
              TALK TO AGENT
              <MoveRight className="w-6 h-6" />
            </a>
            <div className="flex items-center gap-4 text-[13px] font-semibold text-green">
              ● No Bank Account Required
            </div>
          </div>
        </div>

        <div className="flex justify-center xl:justify-end perspective-2000 w-full relative h-[600px] md:h-[700px] lg:h-[850px] mb-20 lg:mb-0 mt-10 lg:mt-0 scale-105">
          <CharacterCard className="w-full h-full max-w-[650px]" />
        </div>
      </main>

      {/* Features Marquee */}
      <div className="w-full bg-[#eee] text-ink py-6 overflow-hidden mt-12 border-y-[2px] border-ink/10">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_20s_linear_infinite] px-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="font-display text-3xl uppercase tracking-widest flex items-center gap-16">
              <span>Grow Your Business</span>
              <span className="w-4 h-4 bg-paper rounded-full"></span>
              <span>Get Formal Credit</span>
              <span className="w-4 h-4 bg-paper rounded-full"></span>
              <span>Smart Marketing Setup</span>
              <span className="w-4 h-4 bg-paper rounded-full"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div className="bg-paper p-8 brutal-border brutal-shadow flex flex-col gap-6">
          <div className="w-16 h-16 bg-banana flex items-center justify-center border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <TrendingUp className="w-8 h-8 stroke-[3]" />
          </div>
          <h3 className="font-display text-3xl">Track Your Sales</h3>
          <p className="font-medium text-lg leading-relaxed">
            Chat with the AI to log your daily cash transactions. This builds a clear record of your business income over time, helping you secure formal credit and loans.
          </p>
        </div>

        <div className="bg-paper p-8 brutal-border brutal-shadow flex flex-col gap-6">
          <div className="w-16 h-16 bg-banana flex items-center justify-center border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Users className="w-8 h-8 stroke-[3]" />
          </div>
          <h3 className="font-display text-3xl">Marketing Support</h3>
          <p className="font-medium text-lg leading-relaxed">
            Get personalized advice to bring in more local customers. Uncedo helps you figure out the best ways to advertise and manage stock based on what people buy.
          </p>
        </div>

        <div className="bg-paper p-8 brutal-border brutal-shadow flex flex-col gap-6">
          <div className="w-16 h-16 bg-banana flex items-center justify-center border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="w-8 h-8 stroke-[3]" />
          </div>
          <h3 className="font-display text-3xl">Simple WhatsApp Setup</h3>
          <p className="font-medium text-lg leading-relaxed">
            There are no complicated apps to install. If you know how to send a WhatsApp message, you already know how to use Uncedo for your business.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-ink text-paper py-24 mt-12 border-y-4 border-ink relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl mb-4 text-banana">How It Works</h2>
            <p className="text-xl max-w-2xl mx-auto opacity-90">A simple WhatsApp setup to get your business recognized.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Step 1 */}
            <div className="bg-paper text-ink p-8 brutal-border shadow-[8px_8px_0px_var(--color-banana)] relative">
              <div className="absolute -top-6 -left-6 bg-green text-ink font-display text-4xl w-14 h-14 flex items-center justify-center brutal-border rounded-full shadow-[4px_4px_0px_#000] rotate-[-5deg]">1</div>
              <h3 className="font-display text-2xl mb-3 mt-4">Save Our Number</h3>
              <p className="font-medium text-lg text-[#444]">Save Uncedo's WhatsApp number to your phone contacts. No app store downloads needed at all.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-paper text-ink p-8 brutal-border shadow-[8px_8px_0px_var(--color-banana)] relative">
              <div className="absolute -top-6 -left-6 bg-green text-ink font-display text-4xl w-14 h-14 flex items-center justify-center brutal-border rounded-full shadow-[4px_4px_0px_#000] rotate-[5deg]">2</div>
              <h3 className="font-display text-2xl mb-3 mt-4">Send a Message</h3>
              <p className="font-medium text-lg text-[#444]">Send "Hi" or register your business name. Our AI assistant will guide you step by step.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-paper text-ink p-8 brutal-border shadow-[8px_8px_0px_var(--color-banana)] relative">
              <div className="absolute -top-6 -left-6 bg-green text-ink font-display text-4xl w-14 h-14 flex items-center justify-center brutal-border rounded-full shadow-[4px_4px_0px_#000] rotate-[-5deg]">3</div>
              <h3 className="font-display text-2xl mb-3 mt-4">Log Your Sales</h3>
              <p className="font-medium text-lg text-[#444]">Tell the agent when you make a sale. Over time, you build a credit profile for loans.</p>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ */}
      <section className="w-full bg-[#eee] py-24 border-y-[2px] border-ink/20 relative z-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-5xl mb-12 text-center text-ink flex items-center justify-center gap-4">
            <MessageCircle className="w-12 h-12" /> FAQ
          </h2>
          <div className="flex flex-col gap-6">
            <div className="bg-paper p-8 brutal-border shadow-[4px_4px_0px_var(--color-ink)] hover:-translate-y-1 transition-transform">
              <h4 className="font-display text-2xl mb-3">Is this service really free?</h4>
              <p className="font-medium text-lg text-ink/80">Yes! You only pay standard WhatsApp data charges. The Uncedo Agent is completely free to chat with and record your business information.</p>
            </div>
            <div className="bg-paper p-8 brutal-border shadow-[4px_4px_0px_var(--color-ink)] hover:-translate-y-1 transition-transform">
              <h4 className="font-display text-2xl mb-3">Do I need a smartphone?</h4>
              <p className="font-medium text-lg text-ink/80">As long as your phone can run WhatsApp, you can use our service. There are no fancy apps to download or storage space required.</p>
            </div>
            <div className="bg-paper p-8 brutal-border shadow-[4px_4px_0px_var(--color-ink)] hover:-translate-y-1 transition-transform">
              <h4 className="font-display text-2xl mb-3">Is my financial data safe?</h4>
              <p className="font-medium text-lg text-ink/80">Absolutely. Your cash transaction history is completely private and only used to generate your Hustle Score. We never share your data without your clear permission.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="w-full bg-ink text-paper py-32 text-center px-6 border-t-8 border-banana relative z-20">
        <h2 className="h1-mega text-banana mb-8">READY TO GROW?</h2>
        <p className="text-2xl max-w-2xl mx-auto mb-12 font-medium opacity-90">
          Join thousands of other South African business owners building their credit profile on WhatsApp today.
        </p>
        <a
          href="https://wa.me/1415523886?text=join-column-means"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex bg-green text-ink font-display text-[22px] px-12 py-6 brutal-border shadow-[8px_8px_0px_var(--color-paper)] hover:scale-105 transition-transform uppercase rounded-[100px] mb-8"
        >
          START CHATTING NOW
        </a>
        <div className="mt-16 text-sm font-bold tracking-widest uppercase opacity-50">
          © 2026 UNCEDO AI. All Rights Reserved.
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

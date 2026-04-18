import CharacterCard from "@/src/components/CharacterCard";
import { Link } from "react-router-dom";
import { MoveRight, TrendingUp, Users, ShieldCheck } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-paper">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-banana rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="font-display text-4xl tracking-tight">UNCEDO<span className="text-banana-deep">AI</span></div>
        <Link 
          to="/agent" 
          className="bg-banana text-ink font-display text-xl px-8 py-3 brutal-border brutal-shadow-sm uppercase hover:bg-banana-deep"
        >
          Enter Ledger
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="flex flex-col gap-8">
          <div className="inline-block bg-ink text-paper font-bold uppercase tracking-wider text-sm px-4 py-2 w-max brutal-border">
            The Digital Hustle Record
          </div>
          <h1 className="h1-mega">
            TURN YOUR <br/> <span>HUSTLE</span> INTO <br/> CREDIT.
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-xl text-ink/80 leading-relaxed text-[#444]">
            A reputation asset for informal entrepreneurs. Transform your daily transaction logs into a verifiable business presence and unlock formal credit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <Link 
              to="/agent" 
              className="bg-ink text-paper font-display text-[18px] px-10 py-5 brutal-border brutal-shadow flex items-center justify-center gap-3 hover:scale-105 transition-transform rounded-[100px]"
            >
              TALK TO AGENT
              <MoveRight className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-4 text-[13px] font-semibold text-green">
              ● No Bank Account Required
            </div>
          </div>
        </div>

        <div className="flexjustify-center lg:justify-end">
          <CharacterCard className="w-full max-w-md" />
        </div>
      </main>

      {/* Features Marquee */}
      <div className="w-full bg-[#eee] text-ink py-6 overflow-hidden mt-12 border-y-[2px] border-ink/10">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_20s_linear_infinite] px-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="font-display text-3xl uppercase tracking-widest flex items-center gap-16">
              <span>Hustle Score Gen</span>
              <span className="w-4 h-4 bg-paper rounded-full"></span>
              <span>Community Buying</span>
              <span className="w-4 h-4 bg-paper rounded-full"></span>
              <span>Market Insights</span>
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
          <h3 className="font-display text-3xl">Hustle Score</h3>
          <p className="font-medium text-lg leading-relaxed">
            The AI agent parses conversational entries into a structured financial ledger, generating a verifiable Hustle Score for micro-lenders.
          </p>
        </div>
        
        <div className="bg-paper p-8 brutal-border brutal-shadow flex flex-col gap-6">
          <div className="w-16 h-16 bg-banana flex items-center justify-center border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Users className="w-8 h-8 stroke-[3]" />
          </div>
          <h3 className="font-display text-3xl">Bulk Buying</h3>
          <p className="font-medium text-lg leading-relaxed">
            Aggregates local demand to trigger community-driven bulk buying. Save on overhead by teaming up with neighboring hustlers.
          </p>
        </div>

        <div className="bg-paper p-8 brutal-border brutal-shadow flex flex-col gap-6">
          <div className="w-16 h-16 bg-banana flex items-center justify-center border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="w-8 h-8 stroke-[3]" />
          </div>
          <h3 className="font-display text-3xl">Financial Inclusion</h3>
          <p className="font-medium text-lg leading-relaxed">
            Digitize the informal economy and build a collective intelligence layer that unlocks financial access for the traditionally unbanked.
          </p>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

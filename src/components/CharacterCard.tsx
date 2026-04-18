import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React from "react";
import { cn } from "@/src/lib/utils";
import characterImg from "./character.png";

export default function CharacterCard({ className }: { className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Exaggerated rotation for pop-out 3D effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

  // Glare moves opposite to the cursor for simulated reflection
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={cn("relative perspective-2000 cursor-none", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        style={{ rotateX, rotateY }}
      >
        {/* Base Card with Image */}
        <div
          className="absolute inset-0 brutal-border bg-banana overflow-hidden shadow-[20px_20px_0px_#000] scale-95"
          style={{ borderRadius: "24px", transform: "translateZ(0px)" }}
        >
          <img
            src={characterImg}
            alt="Ikusasa Agent Focus"
            className="w-full h-full object-cover filter contrast-125 saturate-110"
          />

          {/* Dynamic Glare Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, transparent 50%)",
              left: glareX,
              top: glareY,
              width: "200%",
              height: "200%",
              transform: "translate(-25%, -25%)"
            }}
          />
        </div>

        {/* Floating Elements (Massive Z-Translation for Parallax) */}
        <div
          className="absolute -bottom-10 -left-10 bg-paper brutal-border p-6 shadow-[12px_12px_0px_var(--color-ink)]"
          style={{ transform: "translateZ(120px)", borderRadius: "20px" }}
        >
          <div className="text-sm font-bold uppercase tracking-widest text-[#444] mb-1">Hustle Score</div>
          <div className="font-display text-7xl text-green leading-none">842</div>
          <div className="mt-3 bg-[#DCFCE7] text-green px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide inline-block">
            A+ Profile
          </div>
        </div>

        <div
          className="absolute top-16 -right-12 bg-banana brutal-border px-6 py-2.5 shadow-[8px_8px_0px_var(--color-ink)] rotate-[8deg]"
          style={{ transform: "translateZ(180px)", borderRadius: "12px" }}
        >
          <div className="font-display text-3xl">ACTIVE</div>
        </div>

        <div
          className="absolute top-64 -left-14 bg-ink text-paper brutal-border px-5 py-2 shadow-[8px_8px_0px_var(--color-banana)] rotate-[-12deg]"
          style={{ transform: "translateZ(150px)", borderRadius: "10px" }}
        >
          <div className="font-display text-2xl text-banana">AI AGENT</div>
        </div>

      </motion.div>
    </div>
  );
}

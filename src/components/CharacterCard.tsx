import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React from "react";
import { cn } from "@/src/lib/utils";

export default function CharacterCard({ className }: { className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
    <motion.div
      className={cn("perspective-1000", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="w-full max-w-sm mx-auto aspect-[3/4] brutal-border brutal-shadow rounded-[20px] overflow-hidden bg-gradient-to-br from-banana to-banana-deep group"
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Replace this placeholder with your character image file */}
        <img
          src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=800"
          alt="UncedoAI Agent Character"
          className="w-full h-full object-cover filter contrast-125 saturate-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay content to give extra depth */}
        <div 
          className="absolute bottom-4 left-4 right-4 bg-paper brutal-border brutal-shadow-sm p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="font-display text-2xl mb-1">UNCEDO AGENT</div>
          <div className="text-sm font-semibold uppercase tracking-wider">Ready to Hustle</div>
        </div>
      </div>
    </motion.div>
  );
}

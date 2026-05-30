"use client";

import React, { useState } from "react";
import { X, Sparkles, Key } from "lucide-react";

interface Memory {
  id: number;
  title: string;
  description: string;
  color: string;
  x: string; // Position inside jar
  y: string;
  delay: string; // Float animation delay
  image?: string;
  objectPosition?: string;
}

interface StarJarProps {
  onComplete: () => void;
}

const MEMORIES: Memory[] = [
  {
    id: 1,
    title: "Our Great Friendship",
    description: "A sky full of stars, and finding a friend like you is the brightest highlight of them all. You've brought so much joy, support, and light into my life.",
    color: "#38bdf8",
    x: "28%",
    y: "40%",
    delay: "0s",
    image: "/images/memory1.webp",
    objectPosition: "center 10%",
  },
  {
    id: 2,
    title: "First Hangout",
    description: "That nervous laughter, the long conversation, and how easily we clicked. The moment you smiled, I knew we were going to be great friends.",
    color: "#60a5fa",
    x: "65%",
    y: "35%",
    delay: "1.5s",
    image: "/images/memory2.webp",
    objectPosition: "center 10%",
  },
  {
    id: 3,
    title: "Late Night Chats",
    description: "Laughing at silly jokes, talking about everything and nothing until the sun came up. Those deep conversations with you are my absolute favorite.",
    color: "#818cf8",
    x: "48%",
    y: "55%",
    delay: "0.8s",
    image: "/images/memory3.webp",
    objectPosition: "center 10%",
  },
  {
    id: 4,
    title: "Your Joyous Laugh",
    description: "Your laughter is my favorite sound. It lights up any room instantly and has the magical power to cheer anyone up.",
    color: "#a5f3fc",
    x: "32%",
    y: "70%",
    delay: "2.2s",
    image: "/images/memory4.webp",
    objectPosition: "center 10%",
  },
  {
    id: 5,
    title: "Simple Fun Times",
    description: "Just sitting together, sharing a quiet moment, or going on random road trips. The best times are always the simplest ones with you.",
    color: "#93c5fd",
    x: "62%",
    y: "72%",
    delay: "1.2s",
    image: "/images/memory5.webp",
    objectPosition: "center 10%",
  },
];

export default function StarJar({ onComplete }: StarJarProps) {
  const [clickedStars, setClickedStars] = useState<number[]>([]);
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const [showKeyReveal, setShowKeyReveal] = useState(false);

  const handleStarClick = (memory: Memory) => {
    setActiveMemory(memory);
    if (!clickedStars.includes(memory.id)) {
      const updated = [...clickedStars, memory.id];
      setClickedStars(updated);
      if (updated.length === MEMORIES.length) {
        // All stars clicked, trigger key reveal after closing modal
      }
    }
  };

  const handleCloseMemory = () => {
    setActiveMemory(null);
    if (clickedStars.length === MEMORIES.length) {
      setTimeout(() => {
        setShowKeyReveal(true);
      }, 600);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 w-full max-w-4xl mx-auto px-4">
      {/* Stage Instruction */}
      <div className="text-center mb-8 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gold-accent tracking-wide mb-3 flex items-center justify-center gap-2">
          <Sparkles className="animate-pulse" size={24} />
          Jar of Memories
          <Sparkles className="animate-pulse" size={24} />
        </h2>
        <p className="text-sm md:text-base text-text-champagne/80 font-body max-w-md mx-auto">
          Click and release each floating star inside the jar to reveal the cherished memories written just for you.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-velvet-light/50 border border-gold-accent/20 text-xs font-semibold text-gold-accent tracking-widest uppercase">
          Stars Found: {clickedStars.length} / {MEMORIES.length}
        </div>
      </div>

      <div className="relative flex justify-center items-center w-full min-h-[450px]">
        {/* Memory Jar Graphic */}
        <div className="relative w-72 h-[380px] bg-gradient-to-b from-white/10 to-white/5 border-2 border-white/20 rounded-t-[100px] rounded-b-[40px] shadow-[0_0_40px_rgba(255,255,255,0.05),_inset_0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-[2px] transition-transform duration-500 hover:scale-105 group">
          {/* Jar Cork Lid */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-32 h-8 bg-amber-900/90 border border-amber-950 rounded-lg shadow-md z-10 flex items-center justify-center">
            <div className="w-28 h-1.5 bg-amber-800 rounded-full opacity-60"></div>
          </div>
          {/* Jar Neck */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-40 h-4 bg-gradient-to-r from-white/20 via-white/10 to-white/20 border border-white/20 rounded-full shadow-sm z-0"></div>

          {/* Wooden tag tied to the jar */}
          <div className="absolute top-12 -right-8 w-20 h-10 bg-amber-900/80 border border-amber-950 rounded-md rotate-[18deg] shadow-lg flex flex-col items-center justify-center z-10 before:content-[''] before:absolute before:top-2 before:left-2 before:w-1.5 before:h-1.5 before:bg-velvet-dark before:rounded-full">
            <span className="text-[10px] text-amber-100 font-display font-semibold tracking-widest uppercase leading-none">
              Alekya
            </span>
            <span className="text-[8px] text-gold-accent font-body mt-1">
              Best Friend
            </span>
            {/* Tag String */}
            <svg className="absolute -left-5 -top-3 w-7 h-6 pointer-events-none" viewBox="0 0 28 24">
              <path d="M28 20 C18 12, 10 5, 0 1" stroke="#d97706" strokeWidth="1" fill="none" strokeDasharray="2,2" />
            </svg>
          </div>

          {/* Floating Stars Inside Jar */}
          {MEMORIES.map((memory) => {
            const isClicked = clickedStars.includes(memory.id);
            return (
              <button
                key={memory.id}
                onClick={() => handleStarClick(memory)}
                className={`absolute w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-500 outline-none`}
                style={{
                  left: memory.x,
                  top: memory.y,
                  animation: `float-slow 6s ease-in-out infinite`,
                  animationDelay: memory.delay,
                }}
              >
                <div className="relative group/star">
                  {/* Star shape */}
                  <svg
                    className={`w-8 h-8 transition-all duration-300 transform group-hover/star:scale-125 ${
                      isClicked
                        ? "text-gold-accent opacity-50 fill-current filter drop-shadow-[0_0_2px_rgba(229,193,88,0.5)]"
                        : "text-gold-accent fill-current filter drop-shadow-[0_0_8px_rgba(229,193,88,0.8)] animate-pulse-glow"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
                  </svg>
                  
                  {/* Inner small number indicator */}
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-velvet-dark">
                    {memory.id}
                  </span>

                  {/* Pulsing ring around unclicked stars */}
                  {!isClicked && (
                    <div className="absolute -inset-1 rounded-full border border-gold-accent/40 animate-ping opacity-25"></div>
                  )}
                </div>
              </button>
            );
          })}

          {/* Liquid/Glass shimmer glow at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-gold-accent/10 to-transparent rounded-b-[40px]"></div>
        </div>
      </div>

      {/* Memory Card Modal Popup */}
      {activeMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-velvet-dark/80 backdrop-blur-md animate-fade-in-up">
          <div className="relative w-full max-w-sm glass-panel p-6 rounded-3xl border-2 border-gold-accent/30 shadow-2xl flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={handleCloseMemory}
              className="absolute top-4 right-4 text-text-champagne/70 hover:text-gold-accent hover:scale-110 transition-all duration-200"
            >
              <X size={20} />
            </button>

            {/* Polaroid Frame */}
            <div className="w-full bg-white p-4 pb-8 rounded-lg shadow-lg flex flex-col items-center transform rotate-[-2deg]">
              {/* Image Placeholder - Drawing a gorgeous heart icon inside or showing image */}
              <div
                className="w-full aspect-square rounded-sm bg-rose-50 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${activeMemory.color}22 0%, ${activeMemory.color}55 100%)`,
                }}
              >
                <div className="absolute inset-0 bg-mesh opacity-20"></div>
                {activeMemory.image ? (
                  <img
                    src={activeMemory.image}
                    alt={activeMemory.title}
                    className="w-full h-full object-cover animate-fade-in"
                    style={{
                      objectPosition: activeMemory.objectPosition || "center 10%",
                    }}
                  />
                ) : (
                  <svg
                    className="w-20 h-20 animate-pulse"
                    style={{ color: activeMemory.color, filter: `drop-shadow(0 0 10px ${activeMemory.color}88)` }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
                <span className={`absolute bottom-2 right-2 text-xs font-display italic font-semibold ${
                  activeMemory.image
                    ? "text-white bg-black/45 backdrop-blur-[2px] px-2 py-0.5 rounded shadow-sm"
                    : "text-velvet-dark/70"
                }`}>
                  Memory #{activeMemory.id}
                </span>
              </div>

              {/* Memory Text */}
              <div className="w-full mt-4 flex flex-col font-display text-velvet-dark">
                <span className="text-xl font-bold border-b border-neutral-100 pb-1 mb-2 tracking-wide">
                  {activeMemory.title}
                </span>
                {/* Handwritten-style script */}
                <p className="text-sm font-medium leading-relaxed text-neutral-800 tracking-wide font-display italic">
                  "{activeMemory.description}"
                </p>
              </div>
            </div>

            <button
              onClick={handleCloseMemory}
              className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-gold-accent to-rose-accent text-velvet-dark font-bold text-xs uppercase tracking-widest shadow-md hover:brightness-110 active:scale-95 transition-all duration-300"
            >
              Keep in my Heart
            </button>
          </div>
        </div>
      )}

      {/* Key Reveal Popup (When all 5 memories are read) */}
      {showKeyReveal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-velvet-dark/95 backdrop-blur-lg animate-fade-in-up">
          <div className="glass-panel p-8 rounded-3xl border-2 border-gold-accent/40 max-w-md w-full text-center shadow-2xl flex flex-col items-center animate-pulse-glow">
            <div className="w-16 h-16 rounded-full bg-gold-accent/15 border border-gold-accent flex items-center justify-center mb-6">
              <Key size={32} className="text-gold-accent animate-bounce" />
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-bold text-gold-accent tracking-wide mb-3">
              The Cosmic Key
            </h3>
            
            <p className="text-sm text-text-champagne/80 font-body mb-6 max-w-sm leading-relaxed">
              You've read all the stars, Alekya! Your curiosity has unlocked the Cosmic Key. It's time to unlock the next part of your surprise.
            </p>

            <button
              onClick={onComplete}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-accent to-rose-accent text-velvet-dark font-bold text-sm tracking-widest uppercase hover:scale-105 active:scale-95 shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              Unlock Stage 3: Make a Wish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

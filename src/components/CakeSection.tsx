"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

interface CakeSectionProps {
  onComplete: () => void;
}

export default function CakeSection({ onComplete }: CakeSectionProps) {
  const [candles, setCandles] = useState([
    { id: 1, isLit: true, left: "28%" },
    { id: 2, isLit: true, left: "50%" },
    { id: 3, isLit: true, left: "72%" },
  ]);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandle = (id: number) => {
    if (!wishMade) return; // Must make a wish first
    
    setCandles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isLit: false } : c))
    );

    // Check if all are blown out
    const updatedCandles = candles.map((c) => (c.id === id ? { ...c, isLit: false } : c));
    if (updatedCandles.every((c) => !c.isLit)) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  const handleMakeWish = () => {
    setWishMade(true);
  };

  const litCount = candles.filter((c) => c.isLit).length;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 w-full max-w-xl mx-auto px-4 select-none">
      {/* Title */}
      <div className="text-center mb-8 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gold-accent tracking-wide mb-3 flex items-center justify-center gap-2">
          Make a Birthday Wish
        </h2>
        <p className="text-sm text-text-champagne/80 font-body max-w-sm mx-auto">
          {!wishMade
            ? "Close your eyes, make a silent wish in your heart, and then click the button below to blow out your candles."
            : litCount > 0
            ? "Now, click each candle to blow it out and unlock your final birthday gift!"
            : "Your wish is heading to the stars..."}
        </p>
      </div>

      {/* Cake Container */}
      <div className="relative w-full max-w-xs h-[320px] flex flex-col items-center justify-end mb-8 animate-float">
        
        {/* Candlesticks & Flames */}
        <div className="absolute top-10 w-44 h-16 z-10">
          {candles.map((candle) => (
            <div
              key={candle.id}
              onClick={() => handleBlowCandle(candle.id)}
              className={`absolute bottom-0 w-3 h-14 bg-gradient-to-t from-blue-600 to-indigo-800 rounded-sm cursor-pointer shadow-inner transition-opacity duration-300`}
              style={{ left: candle.left }}
            >
              {/* Candle stripes */}
              <div className="w-full h-full bg-repeating-linear-gradient opacity-35" style={{
                background: "repeating-linear-gradient(45deg, #fff, #fff 4px, transparent 4px, transparent 8px)"
              }}></div>
              
              {/* Wick */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-neutral-600 rounded-sm"></div>

              {/* Flame */}
              {candle.isLit ? (
                <div
                  className={`absolute -top-8 left-1/2 -translate-x-1/2 w-5 h-8 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full animate-candle-flicker origin-bottom`}
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(245,158,11,0.8)) drop-shadow(0 0 15px rgba(239,68,68,0.4))",
                  }}
                >
                  {/* Inner flame core */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-4 bg-yellow-100 rounded-full opacity-80"></div>
                </div>
              ) : (
                /* Smoke puff on blowout */
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-ping opacity-0" style={{ animationDuration: '1s', animationIterationCount: 1 }}>
                  <div className="w-4 h-4 bg-neutral-400/50 rounded-full blur-[2px]"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 2-Tier Cake design */}
        {/* Tier 2 (Top) */}
        <div className="w-48 h-20 bg-gradient-to-r from-sky-400 to-sky-500 rounded-t-2xl relative shadow-md flex items-center justify-center border-t border-white/20">
          {/* Frosting Drips */}
          <div className="absolute -bottom-1 left-0 right-0 h-4 flex gap-0.5 justify-around pointer-events-none z-10">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-5 bg-gradient-to-b from-white to-slate-50 rounded-b-full shadow-sm"
                style={{ height: `${Math.sin(i) * 6 + 10}px` }}
              ></div>
            ))}
          </div>
          {/* Top sprinkles and blueberries */}
          <div className="absolute -top-1.5 left-0 right-0 h-3 flex justify-around px-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-blue-600 border border-blue-500 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
            ))}
          </div>
        </div>

        {/* Tier 1 (Base) */}
        <div className="w-64 h-24 bg-gradient-to-r from-blue-700 to-indigo-900 rounded-t-2xl relative shadow-lg flex items-center justify-center border-t border-white/10 z-0">
          {/* Bottom frosting drips */}
          <div className="absolute -bottom-1 left-0 right-0 h-5 flex gap-0.5 justify-around pointer-events-none z-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-5 bg-gradient-to-b from-white to-slate-100 rounded-b-full shadow-sm"
                style={{ height: `${Math.cos(i) * 8 + 12}px` }}
              ></div>
            ))}
          </div>
          {/* Birthday text on Cake */}
          <span className="font-display font-bold text-lg tracking-widest text-white gold-glow select-none uppercase">
            HBD Alekya
          </span>
        </div>

        {/* Stand / Plate */}
        <div className="w-72 h-4 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-full shadow-xl border border-slate-300"></div>
        <div className="w-52 h-4 bg-slate-400/30 rounded-b-full shadow-md z-[-1] opacity-75"></div>
      </div>

      {/* Control Button */}
      {!wishMade ? (
        <button
          onClick={handleMakeWish}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-accent to-rose-accent text-velvet-dark font-bold text-sm tracking-widest uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <Sparkles size={16} />
          I've Made a Wish
        </button>
      ) : (
        litCount > 0 && (
          <div className="text-xs uppercase tracking-widest text-gold-accent/80 font-bold bg-velvet-light/40 border border-gold-accent/20 px-4 py-2 rounded-full animate-pulse">
            Blow out the candles ({litCount} remaining)
          </div>
        )
      )}
    </div>
  );
}

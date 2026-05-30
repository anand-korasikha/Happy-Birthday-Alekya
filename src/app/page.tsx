"use client";

import React, { useState, useRef } from "react";
import HeartConfetti from "@/components/HeartConfetti";
import MusicPlayer from "@/components/MusicPlayer";
import StarJar from "@/components/StarJar";
import CakeSection from "@/components/CakeSection";
import { Sparkles, Heart, RotateCcw } from "lucide-react";
import Image from "next/image";

type Stage = "intro" | "jar" | "cake" | "reveal";

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Transition from wax letter to jar
  const handleOpenLetter = () => {
    setMusicPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video play failed or was blocked:", err);
      });
    }
    setStage("jar");
  };

  // Transition from jar to cake
  const handleJarComplete = () => {
    setStage("cake");
  };

  // Transition from cake to grand reveal
  const handleCakeComplete = () => {
    setStage("reveal");
  };

  return (
    <div className="relative flex flex-col flex-1 min-h-screen items-center justify-center overflow-hidden">
      {/* Background Mesh styling (Fallback at bottom-most level) */}
      <div className="bg-mesh !z-[-10] pointer-events-none"></div>

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[-5] pointer-events-none opacity-50"
      >
        <source src="/vedio.webm" type="video/webm" />
      </video>

      {/* Dark tint overlay for video legibility */}
      <div className="fixed inset-0 bg-gradient-to-b from-velvet-dark/80 via-velvet-medium/40 to-velvet-dark/90 z-[-2] pointer-events-none"></div>

      {/* Background celestial glow particles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Floating Canvas Confetti (Active in the final reveal stage) */}
      <HeartConfetti active={stage === "reveal"} />

      {/* Floating Record Player (Mounted early for autoplay gesture propagation) */}
      <div className={`transition-all duration-700 ${stage === "intro" ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100"}`}>
        <MusicPlayer isPlaying={musicPlaying} setIsPlaying={setMusicPlaying} currentStage={stage} />
      </div>

      {/* Main Experience Router */}
      <main className="flex flex-col flex-1 w-full items-center justify-center py-12 px-6 z-10">
        
        {/* Stage 0: Wax-Sealed Intro Letter */}
        {stage === "intro" && (
          <div className="w-full max-w-lg flex flex-col items-center justify-center animate-fade-in-up text-center px-4">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-gold-accent font-semibold px-3 py-1 rounded-full bg-gold-accent/10 border border-gold-accent/30 font-body">
                A special invitation
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-champagne mb-8 leading-tight">
              For My Best Friend, <br/>
              <span className="text-gold-accent text-5xl md:text-6xl tracking-wide font-display italic gold-glow block mt-2">
                Alekya
              </span>
            </h1>

            {/* Sealed Envelope Graphic */}
            <div className="relative w-80 h-48 bg-gradient-to-br from-velvet-light to-velvet-dark border border-gold-accent/20 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-500 hover:shadow-[0_20px_45px_rgba(56,189,248,0.15)] group">
              {/* Back flap lines */}
              <div className="absolute inset-0 bg-transparent border-t-[96px] border-t-white/[0.03] border-x-[160px] border-x-transparent border-b-[96px] border-b-transparent rounded-2xl pointer-events-none"></div>
              
              {/* Wax Seal Button */}
              <button
                onClick={handleOpenLetter}
                className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 border-2 border-blue-500 shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer transform hover:scale-110 active:scale-95 hover:rotate-12 transition-all duration-300 z-10 group-hover:border-gold-accent/50"
                aria-label="Open Letter"
              >
                <div className="relative flex items-center justify-center w-full h-full">
                  <span className="font-display text-2xl font-bold text-gold-accent select-none gold-glow">
                    A
                  </span>
                  {/* Subtle pulsing seal outline */}
                  <div className="absolute -inset-1.5 rounded-full border border-gold-accent/20 animate-ping pointer-events-none"></div>
                </div>
              </button>

              <span className="absolute bottom-4 text-[10px] tracking-widest text-gold-accent/60 font-body uppercase font-bold">
                Tap Seal to Unveil
              </span>
            </div>

            <p className="mt-8 text-xs text-text-champagne/50 font-body max-w-xs">
              Make sure your volume is turned up to enjoy the full celestial surprise experience.
            </p>
          </div>
        )}

        {/* Stage 1: Star Memory Jar */}
        {stage === "jar" && (
          <StarJar onComplete={handleJarComplete} />
        )}

        {/* Stage 2: Birthday Cake candle blowing */}
        {stage === "cake" && (
          <CakeSection onComplete={handleCakeComplete} />
        )}

        {/* Stage 3: Grand Surprise Reveal & Love Letter Scroll */}
        {stage === "reveal" && (
          <div className="w-full max-w-2xl flex flex-col items-center justify-center animate-fade-in-up py-6 px-4">
            
            {/* Celebration Header */}
            <div className="text-center mb-8 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-rose-accent/15 flex items-center justify-center mb-4 border border-rose-accent animate-float">
                <Heart className="text-rose-accent fill-current" size={28} />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gold-accent gold-glow tracking-wide mb-2">
                Happy Birthday, Alekya!
              </h1>
              <p className="text-xs uppercase tracking-widest text-rose-accent font-semibold">
                May your day be as magical as your smile
              </p>
            </div>

            {/* Scroll Container */}
            <div className="w-full glass-panel p-8 md:p-12 rounded-[32px] border-2 border-gold-accent/20 shadow-2xl relative mb-12 before:content-[''] before:absolute before:-inset-0.5 before:rounded-[34px] before:bg-gradient-to-br before:from-gold-accent/20 before:to-rose-accent/10 before:z-[-1] before:opacity-50">
              {/* Gold borders/decorations inside scroll */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-gold-accent/10 rounded-2xl pointer-events-none"></div>

              {/* The Love Letter */}
              <div className="flex flex-col font-display text-text-champagne leading-relaxed text-center gap-6 max-w-xl mx-auto py-2 z-10 relative">
                <p className="text-2xl font-bold tracking-wide italic border-b border-gold-accent/10 pb-4">
                  Dearest Alekya,
                </p>

                <p className="text-base md:text-lg font-medium leading-loose text-text-champagne/90">
                  Today is a celebration of the day you came into this world and made it infinitely more beautiful, kind, and bright. You are an incredible friend, a constant source of laughter, and a true blessing in my life.
                </p>

                <p className="text-base md:text-lg font-medium leading-loose text-text-champagne/90">
                  Thank you for all the laughter we share, the bright energy you bring to every moment, and your endless support. Thank you for just being you. I cherish our friendship so much.
                </p>

                <p className="text-base md:text-lg font-medium leading-loose text-text-champagne/90">
                  As you blew out your candles, I wished for nothing but your happiness, peace, and that every dream in your heart comes true. I'll always be right here, cheering you on through all your adventures.
                </p>

                <div className="mt-6 flex flex-col items-center">
                  <span className="text-lg font-bold italic tracking-wide text-gold-accent">
                    Happy Birthday, my friend! 🌟
                  </span>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-accent to-transparent mt-4"></div>
                </div>
              </div>
            </div>

            {/* Polaroid Memory Gallery */}
            <div className="w-full flex flex-col items-center gap-6 mb-8">
              <h3 className="text-xl font-display font-semibold text-gold-accent uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={16} /> Our Starry Album <Sparkles size={16} />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-4">
                {/* Polaroid 1 (Local Image) */}
                <div className="bg-white p-3 pb-6 rounded-lg shadow-lg transform rotate-[-3deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-20 cursor-pointer">
                  <div className="relative w-full aspect-square bg-neutral-100 rounded overflow-hidden">
                    <Image
                      src="/images/album1.webp"
                      alt="A Jar of Wishes"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover animate-fade-in"
                      style={{ objectPosition: "center 10%" }}
                    />
                  </div>
                  <p className="font-display italic text-xs text-neutral-800 text-center mt-3 font-semibold">
                    A Jar of Wishes
                  </p>
                </div>

                {/* Polaroid 2 (Local Image) */}
                <div className="bg-white p-3 pb-6 rounded-lg shadow-lg transform rotate-[1deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-20 cursor-pointer">
                  <div className="relative w-full aspect-square bg-neutral-100 rounded overflow-hidden">
                    <Image
                      src="/images/album2.webp"
                      alt="The Night We Met"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover animate-fade-in"
                      style={{ objectPosition: "center 10%" }}
                    />
                  </div>
                  <p className="font-display italic text-xs text-neutral-800 text-center mt-3 font-semibold">
                    The Night We Met
                  </p>
                </div>

                {/* Polaroid 3 (Local Image) */}
                <div className="bg-white p-3 pb-6 rounded-lg shadow-lg transform rotate-[4deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-20 cursor-pointer">
                  <div className="relative w-full aspect-square bg-neutral-100 rounded overflow-hidden">
                    <Image
                      src="/images/album3.webp"
                      alt="Best Friends Always"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover animate-fade-in"
                      style={{ objectPosition: "center 15%" }}
                    />
                  </div>
                  <p className="font-display italic text-xs text-neutral-800 text-center mt-3 font-semibold">
                    Best Friends Always
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStage("jar")}
              className="mt-12 btn-premium-revisit"
            >
              <RotateCcw size={14} className="btn-icon" />
              Revisit the Memories
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[10px] tracking-widest text-text-champagne/30 z-10 font-body uppercase border-t border-white/5 w-full">
        Designed with love for Alekya • {new Date().getFullYear()}
      </footer>
    </div>
  );
}

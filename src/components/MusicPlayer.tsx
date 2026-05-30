"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentStage: string;
}

const ROMANTIC_TRACK_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Beautiful piano instrumental placeholder
const HAPPY_BIRTHDAY_URL = "https://www.orangefreesounds.com/wp-content/uploads/2018/11/Happy-birthday-piano-music.mp3"; // Traditional Happy Birthday on Piano

export default function MusicPlayer({ isPlaying, setIsPlaying, currentStage }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initialize audio
    audioRef.current = new Audio(ROMANTIC_TRACK_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Sync track with currentStage
  useEffect(() => {
    if (!audioRef.current) return;

    const isBirthdayStage = currentStage === "cake" || currentStage === "reveal";
    const targetUrl = isBirthdayStage ? HAPPY_BIRTHDAY_URL : ROMANTIC_TRACK_URL;

    // Standardize URL check (some browsers convert src to absolute paths)
    const absoluteTargetUrl = new URL(targetUrl, window.location.href).href;
    const absoluteCurrentSrc = audioRef.current.src ? new URL(audioRef.current.src, window.location.href).href : "";

    if (absoluteCurrentSrc !== absoluteTargetUrl) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = targetUrl;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Error playing transitioned track:", err);
        });
      }
    }
  }, [currentStage, isPlaying]);

  // Sync play/pause state from parent
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio autoplay blocked by browser, waiting for user click.", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  // Sync volume state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (v > 0) setIsMuted(false);
  };

  if (!isMounted) return null;

  const isBirthdayStage = currentStage === "cake" || currentStage === "reveal";
  const songTitle = isBirthdayStage ? "Happy Birthday" : "Surprise Music";
  const songSubtitle = isBirthdayStage ? "Piano Cover" : "Soft Piano Melody";

  return (
    <div className="fixed bottom-4 right-4 z-40 glass-panel p-4 rounded-2xl flex items-center gap-4 transition-all duration-500 shadow-xl select-none max-w-xs md:max-w-md">
      {/* Vinyl Record */}
      <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
        {/* Record Base */}
        <div
          className={`w-14 h-14 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center shadow-md relative overflow-hidden transition-transform duration-[8000ms] ease-linear ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{
            animationPlayState: isPlaying ? "running" : "paused",
            backgroundImage: "radial-gradient(circle, #262626 30%, #000000 80%)",
          }}
        >
          {/* Vinyl grooves */}
          <div className="absolute inset-1 rounded-full border border-dashed border-neutral-800 opacity-50"></div>
          <div className="absolute inset-2 rounded-full border border-dashed border-neutral-800 opacity-40"></div>
          <div className="absolute inset-3 rounded-full border border-neutral-800 opacity-30"></div>
          {/* Center Label */}
          <div className="w-5 h-5 rounded-full bg-rose-accent/90 flex items-center justify-center border border-gold-accent/20 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-velvet-dark"></div>
          </div>
        </div>

        {/* Tonearm */}
        <svg
          className="absolute -top-1 right-0 w-8 h-12 transition-transform duration-700 pointer-events-none drop-shadow-md"
          viewBox="0 0 32 48"
          fill="none"
          style={{
            transformOrigin: "26px 6px",
            transform: isPlaying ? "rotate(20deg)" : "rotate(0deg)",
          }}
        >
          {/* Base pivot */}
          <circle cx="26" cy="6" r="4" fill="#a3a3a3" />
          <circle cx="26" cy="6" r="2" fill="#525252" />
          {/* Arm */}
          <path d="M26 6 L20 22 L10 32 L11 36" stroke="#d4d4d4" strokeWidth="2" strokeLinecap="round" />
          {/* Headshell */}
          <rect x="7" y="34" width="6" height="4" rx="1" fill="#737373" transform="rotate(-15 10 36)" />
          {/* Stylus bulb */}
          <circle cx="9" cy="38" r="1.5" fill="#e5c158" className={isPlaying ? "animate-pulse" : ""} />
        </svg>
      </div>

      {/* Controls Container */}
      <div className="flex flex-col gap-1.5 w-40 md:w-48">
        <div className="flex items-center justify-between">
          <div className="flex flex-col overflow-hidden max-w-[70%]">
            <span className="text-xs font-semibold text-gold-accent tracking-wider font-display uppercase truncate">
              {songTitle}
            </span>
            <span className="text-[10px] text-text-champagne/60 truncate">
              {songSubtitle}
            </span>
          </div>

          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-gold-accent hover:bg-gold-accent/90 text-velvet-dark flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-md"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
          </button>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-text-champagne/75 hover:text-gold-accent transition-colors duration-200"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-gold-accent"
          />
        </div>
      </div>
    </div>
  );
}

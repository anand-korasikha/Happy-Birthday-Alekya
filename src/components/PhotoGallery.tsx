"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface PhotoItem {
  src: string;
  title: string;
}

interface PhotoGalleryProps {
  items: PhotoItem[];
}

export default function PhotoGallery({ items }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length]);

  // Handle responsiveness for card displacement
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (diff > 55) {
      nextSlide();
      setTouchStart(null);
    } else if (diff < -55) {
      prevSlide();
      setTouchStart(null);
    }
  };

  const translateOffset = isMobile ? 70 : 130;

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Stack Stage */}
      <div 
        className="relative w-full max-w-xl h-[360px] sm:h-[420px] flex items-center justify-center overflow-hidden px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {items.map((item, index) => {
          let offset = index - currentIndex;
          
          // Wrap around logic for circular carousel list
          if (offset < -1) {
            if (currentIndex === items.length - 1 && index === 0) offset = 1;
            else offset = 2; // hidden
          }
          if (offset > 1) {
            if (currentIndex === 0 && index === items.length - 1) offset = -1;
            else offset = 2; // hidden
          }

          const isActive = index === currentIndex;
          const isPrev = offset === -1;
          const isNext = offset === 1;
          const isVisible = isActive || isPrev || isNext;

          if (!isVisible) return null;

          let zIndex = 10;
          let opacity = 0;
          let rotateDeg = 0;
          let translateX = 0;
          let scale = 0.8;

          if (isActive) {
            zIndex = 30;
            opacity = 1;
            scale = 1.0;
            rotateDeg = 0;
            translateX = 0;
          } else if (isPrev) {
            zIndex = 20;
            opacity = 0.55;
            scale = 0.82;
            rotateDeg = -6;
            translateX = -translateOffset;
          } else if (isNext) {
            zIndex = 20;
            opacity = 0.55;
            scale = 0.82;
            rotateDeg = 6;
            translateX = translateOffset;
          }

          return (
            <div
              key={index}
              onClick={() => {
                if (isActive) setIsLightboxOpen(true);
                else if (isPrev) prevSlide();
                else if (isNext) nextSlide();
              }}
              className="absolute w-56 sm:w-64 bg-white p-3 pb-6 rounded-lg shadow-2xl transition-all duration-500 ease-out cursor-pointer select-none origin-bottom group border border-neutral-100"
              style={{
                transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotateDeg}deg)`,
                zIndex: zIndex,
                opacity: opacity,
              }}
            >
              {/* Polaroid Frame */}
              <div className="relative w-full aspect-square bg-neutral-100 rounded overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center 15%" }}
                  draggable={false}
                />
                
                {/* Active hover zoom/lightbox prompt */}
                {isActive && (
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                      <Maximize2 size={18} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
              <p className="font-display italic text-xs sm:text-sm text-neutral-800 text-center mt-3 font-bold tracking-wide">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons and Dot Indicators */}
      <div className="flex items-center gap-6 mt-4">
        <button
          onClick={prevSlide}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-gold-accent/20 bg-velvet-light/50 text-gold-accent hover:bg-gold-accent/15 active:scale-90 transition-all duration-200 cursor-pointer"
          aria-label="Previous memory"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Small active track dots */}
        <div className="flex gap-1.5 max-w-[200px] overflow-hidden items-center">
          {items.map((_, index) => {
            const isDotActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isDotActive ? "w-5 bg-gold-accent" : "w-1.5 bg-gold-accent/25"
                }`}
                aria-label={`Go to memory ${index + 1}`}
              />
            );
          })}
        </div>

        <button
          onClick={nextSlide}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-gold-accent/20 bg-velvet-light/50 text-gold-accent hover:bg-gold-accent/15 active:scale-90 transition-all duration-200 cursor-pointer"
          aria-label="Next memory"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-velvet-dark/95 backdrop-blur-md animate-fade-in-up">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-text-champagne/70 hover:text-white hover:scale-110 transition-all duration-200 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 cursor-pointer"
            aria-label="Close preview"
          >
            <X size={24} />
          </button>
          
          <div className="relative max-w-2xl max-h-[80vh] w-full flex flex-col items-center bg-white p-4 pb-8 rounded-lg shadow-2xl transform rotate-[-1deg]">
            <img
              src={items[currentIndex].src}
              alt={items[currentIndex].title}
              className="max-h-[60vh] sm:max-h-[65vh] object-contain rounded border border-neutral-100"
            />
            <p className="font-display italic text-lg text-neutral-800 mt-4 font-bold text-center tracking-wide">
              {items[currentIndex].title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";

interface HeartConfettiProps {
  active: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  shape: "heart" | "star" | "sparkle";
  opacity: number;
  fadeSpeed: number;
}

const COLORS = [
  "#2563eb", // Royal blue
  "#1d4ed8", // Deep royal blue
  "#1e3a8a", // Navy blue
  "#3b82f6", // Dodger blue
  "#60a5fa", // Cornflower blue
  "#ffffff", // Sparkle white
];

export default function HeartConfetti({ active }: HeartConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation: number, opacity: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = opacity;
      c.fillStyle = color;
      
      c.beginPath();
      // Draw heart path centered around (0,0)
      const cx = 0;
      const cy = -size / 2;
      
      c.moveTo(cx, cy + size / 4);
      c.quadraticCurveTo(cx, cy, cx + size / 2, cy);
      c.quadraticCurveTo(cx + size, cy, cx + size, cy + size / 4);
      c.quadraticCurveTo(cx + size, cy + size / 2, cx + size / 2, cy + size * 0.85);
      c.quadraticCurveTo(cx, cy + size / 2, cx, cy + size / 4);
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawStar = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation: number, opacity: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = opacity;
      c.fillStyle = color;
      
      c.beginPath();
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size / 2;
      let rot = (Math.PI / 2) * 3;
      let sx = 0;
      let sy = 0;
      const step = Math.PI / spikes;

      c.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        sx = Math.cos(rot) * outerRadius;
        sy = Math.sin(rot) * outerRadius;
        c.lineTo(sx, sy);
        rot += step;

        sx = Math.cos(rot) * innerRadius;
        sy = Math.sin(rot) * innerRadius;
        c.lineTo(sx, sy);
        rot += step;
      }
      c.lineTo(0, -outerRadius);
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = opacity;
      c.fillStyle = color;
      
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();
      c.fill();
      c.restore();
    };

    const createParticle = (burst = false): Particle => {
      const isHeart = Math.random() > 0.4;
      const shape = isHeart ? "heart" : (Math.random() > 0.5 ? "star" : "sparkle");
      const size = Math.random() * (shape === "heart" ? 14 : 8) + 6;
      
      return {
        x: burst ? window.innerWidth / 2 + (Math.random() - 0.5) * 100 : Math.random() * window.innerWidth,
        y: burst ? window.innerHeight * 0.6 + (Math.random() - 0.5) * 100 : -20,
        size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speedX: (Math.random() - 0.5) * (burst ? 12 : 3),
        speedY: burst ? -(Math.random() * 15 + 5) : Math.random() * 3 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        shape,
        opacity: 1,
        fadeSpeed: burst ? Math.random() * 0.01 + 0.005 : 0,
      };
    };

    // If active and we don't have enough particles, add them
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let particles = particlesRef.current;

      // Spawn fresh falling particles
      if (active && particles.length < 150) {
        // Occasional spawns from top
        if (Math.random() < 0.3) {
          particles.push(createParticle(false));
        }
      }

      // Update and draw
      particlesRef.current = particles
        .map((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          // Slowly drift downwards
          if (p.fadeSpeed > 0) {
            p.opacity -= p.fadeSpeed;
          } else {
            // Apply wind drift
            p.speedX += Math.sin(p.y / 30) * 0.02;
          }
          p.rotation += p.rotationSpeed;
          
          // Draw
          if (p.shape === "heart") {
            drawHeart(ctx, p.x, p.y, p.size, p.color, p.rotation, p.opacity);
          } else if (p.shape === "star") {
            drawStar(ctx, p.x, p.y, p.size, p.color, p.rotation, p.opacity);
          } else {
            drawSparkle(ctx, p.x, p.y, p.size, p.color, p.opacity);
          }
          
          return p;
        })
        // Filter out off-screen or faded particles
        .filter((p) => p.y < window.innerHeight + 20 && p.x > -20 && p.x < window.innerWidth + 20 && p.opacity > 0);

      animationRef.current = requestAnimationFrame(update);
    };

    // Initial burst when activation occurs
    if (active) {
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push(createParticle(true));
      }
    }

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}

"use client";
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'circle' | 'star' | 'diamond';
}

const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isActive = true;

    // Устанавливаем размер canvas
    const resizeCanvas = () => {
      if (!isActive || !canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Создаем частички
    const createParticles = () => {
      const particles: Particle[] = [];
      const colors = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];
      const types: ('circle' | 'star' | 'diamond')[] = ['circle', 'star', 'diamond'];

      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: types[Math.floor(Math.random() * types.length)]
        });
      }

      particlesRef.current = particles;
    };

    // Рисуем частичку
    const drawParticle = (particle: Particle) => {
      if (!ctx) return;
      
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;

      switch (particle.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'star':
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
            const x = particle.x + Math.cos(angle) * particle.size;
            const y = particle.y + Math.sin(angle) * particle.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          break;

        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - particle.size);
          ctx.lineTo(particle.x + particle.size, particle.y);
          ctx.lineTo(particle.x, particle.y + particle.size);
          ctx.lineTo(particle.x - particle.size, particle.y);
          ctx.closePath();
          ctx.fill();
          break;
      }

      ctx.restore();
    };

    // Анимация
    const animate = () => {
      if (!isActive || !ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Обновляем позицию
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Отскок от краев
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }

        // Убеждаемся, что частички остаются в пределах экрана
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Рисуем частичку
        drawParticle(particle);

        // Случайное изменение направления
        if (Math.random() < 0.01) {
          particle.vx += (Math.random() - 0.5) * 0.2;
          particle.vy += (Math.random() - 0.5) * 0.2;
        }

        // Ограничиваем скорость
        particle.vx = Math.max(-1, Math.min(1, particle.vx));
        particle.vy = Math.max(-1, Math.min(1, particle.vy));
      });

      if (isActive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    createParticles();
    animate();

    return () => {
      isActive = false;
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-screen pointer-events-none z-10"
      style={{ zIndex: 10 }}
    />
  );
};

export default FloatingParticles;

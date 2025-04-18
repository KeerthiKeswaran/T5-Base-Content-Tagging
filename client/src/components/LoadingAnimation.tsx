import React, { useEffect, useRef } from 'react';

interface LoadingAnimationProps {
  progress: number;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  
  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    fadeSpeed: number;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          opacity: Math.random() * 0.5 + 0.1,
          fadeSpeed: Math.random() * 0.01 + 0.005
        });
      }
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ffffff';
      particlesRef.current.forEach((particle, index) => {
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        particle.opacity += Math.sin(Date.now() * 0.001) * particle.fadeSpeed;
        particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity));
        
        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          particlesRef.current[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5,
            opacity: Math.random() * 0.5 + 0.1,
            fadeSpeed: Math.random() * 0.01 + 0.005
          };
        }
      });
      
      ctx.globalAlpha = 1;
      const progressWidth = (canvas.width * 0.8) * (progress / 100);
      const progressHeight = 6;
      const progressX = canvas.width * 0.1;
      const progressY = canvas.height * 0.8;
      
      ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';
      ctx.fillRect(progressX, progressY, canvas.width * 0.8, progressHeight);
      
      const gradient = ctx.createLinearGradient(progressX, 0, progressX + progressWidth, 0);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(progressX, progressY, progressWidth, progressHeight);
      
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`${Math.round(progress)}%`, canvas.width / 2, progressY + 25);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [progress]);
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-48 relative">
        <p className="text-white text-center mb-4">Generating tags with AI...</p>
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block"
        ></canvas>
      </div>
    </div>
  );
};

export default LoadingAnimation;
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  hue: number;
}

interface InteractiveHeroBackgroundHandle {
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  handleClick: (e: React.MouseEvent) => void;
}

const InteractiveHeroBackground = forwardRef<InteractiveHeroBackgroundHandle>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const timeRef = useRef(0);

  const createParticle = (x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1.5 + 0.5;
    
    // Use site's color scheme: scientific blue (217°), cyan (180°), purple (280°)
    const hues = [217, 180, 280];
    const selectedHue = hues[Math.floor(Math.random() * hues.length)];
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: Math.random() * 120 + 60,
      size: Math.random() * 3 + 1,
      hue: selectedHue + (Math.random() - 0.5) * 20 // Slight variation
    };
  };

  const createWave = (x: number, y: number): Wave => {
    // Use site's color scheme
    const hues = [217, 180, 280];
    const selectedHue = hues[Math.floor(Math.random() * hues.length)];
    
    return {
      x,
      y,
      radius: 0,
      maxRadius: Math.random() * 200 + 100,
      opacity: 0.3, // More subtle
      hue: selectedHue
    };
  };

  const updateParticles = () => {
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;
      
      // Slow down over time
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Attract to mouse if active
      if (mouseRef.current.isActive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200 && distance > 0) {
          const force = (200 - distance) / 200 * 0.3;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
      }
      
      return particle.life < particle.maxLife;
    });
  };

  const updateWaves = () => {
    wavesRef.current = wavesRef.current.filter(wave => {
      wave.radius += 2;
      wave.opacity = Math.max(0, (1 - wave.radius / wave.maxRadius) * 0.6);
      return wave.radius < wave.maxRadius;
    });
  };

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    // Keep background transparent to show the original site design
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const drawWaves = (ctx: CanvasRenderingContext2D) => {
    wavesRef.current.forEach(wave => {
      const gradient = ctx.createRadialGradient(
        wave.x, wave.y, 0,
        wave.x, wave.y, wave.radius
      );
      gradient.addColorStop(0, `hsla(${wave.hue}, 80%, 60%, ${wave.opacity})`);
      gradient.addColorStop(0.5, `hsla(${wave.hue + 20}, 70%, 50%, ${wave.opacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${wave.hue}, 60%, 40%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach(particle => {
      const opacity = 1 - (particle.life / particle.maxLife);
      const size = particle.size * opacity;
      
      // Draw particle glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, size * 3
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${opacity * 0.8})`);
      gradient.addColorStop(0.3, `hsla(${particle.hue + 30}, 100%, 60%, ${opacity * 0.4})`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw particle core
      ctx.fillStyle = `hsla(${particle.hue}, 100%, 80%, ${opacity})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawFloatingElements = (ctx: CanvasRenderingContext2D) => {
    const time = timeRef.current * 0.001;
    const hues = [217, 180, 280]; // Site's color scheme
    
    // Draw floating geometric shapes (fewer and more subtle)
    for (let i = 0; i < 4; i++) {
      const x = (Math.sin(time * 0.2 + i * 1.2) * 150) + ctx.canvas.width / 2;
      const y = (Math.cos(time * 0.15 + i * 0.8) * 100) + ctx.canvas.height / 2;
      const rotation = time * 0.3 + i;
      const hue = hues[i % hues.length];
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 25);
      gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.08)`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      
      if (i % 3 === 0) {
        // Hexagon
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const angle = (j / 6) * Math.PI * 2;
          const px = Math.cos(angle) * 15;
          const py = Math.sin(angle) * 15;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
      } else if (i % 3 === 1) {
        // Triangle
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.lineTo(-10, 8);
        ctx.lineTo(10, 8);
        ctx.closePath();
      } else {
        // Circle
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
      }
      
      ctx.fill();
      ctx.restore();
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += 16;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBackground(ctx);
    drawFloatingElements(ctx);
    drawWaves(ctx);
    updateParticles();
    updateWaves();
    drawParticles(ctx);

    animationFrameId.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.isActive = true;

    // Create particles on mouse movement
    if (Math.random() < 0.8) {
      particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
    }

    // Create waves occasionally
    if (Math.random() < 0.1) {
      wavesRef.current.push(createWave(mouseRef.current.x, mouseRef.current.y));
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
  };

  const handleClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create burst of particles on click
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push(createParticle(x, y));
    }

    // Create wave on click
    wavesRef.current.push(createWave(x, y));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useImperativeHandle(ref, () => ({
    handleMouseMove,
    handleMouseLeave,
    handleClick
  }));

  useEffect(() => {
    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        background: 'transparent',
        zIndex: 0 // Behind all content
      }}
    />
  );
});

InteractiveHeroBackground.displayName = 'InteractiveHeroBackground';

export default InteractiveHeroBackground;

import React, { useEffect, useRef } from 'react';

export default function PetalsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Blossom petals config
    const petalCount = 28;
    const petals = [];

    const colors = [
      'rgba(254, 213, 221, 0.7)',  // soft blush
      'rgba(255, 232, 236, 0.75)', // pale rose
      'rgba(255, 245, 247, 0.8)',  // white-pink
      'rgba(243, 229, 171, 0.45)', // subtle golden petal
      'rgba(254, 240, 245, 0.7)',  // lavender blush
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 1.2 - 0.4,
        speedY: Math.random() * 1 + 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationDistance: Math.random() * 25 + 15,
        baseX: Math.random() * width,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      ctx.beginPath();
      // Organic petal shape using bezier curves
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Subtle center vein
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.8);
      ctx.lineTo(0, p.size * 0.8);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.angle += p.oscillationSpeed;
        p.x = p.baseX + Math.sin(p.angle) * p.oscillationDistance;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.baseX += p.speedX;

        // Wrap around horizontally
        if (p.baseX > width + 50) p.baseX = -50;
        if (p.baseX < -50) p.baseX = width + 50;

        // Wrap around vertically
        if (p.y > height + 20) {
          p.y = -20;
          p.baseX = Math.random() * width;
        }

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-75"
      aria-hidden="true"
    />
  );
}

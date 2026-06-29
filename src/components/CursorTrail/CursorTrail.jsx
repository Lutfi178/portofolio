import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (target)
    const mouse = { x: width / 2, y: height / 2 };
    
    // Smooth custom cursor ring coordinates (lerped)
    const ring = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 3. Render the smooth interactive outer ring
      // Interpolate ring position to follow mouse smoothly (lerp)
      ring.x += (mouse.x - ring.x) * 0.40;
      ring.y += (mouse.y - ring.y) * 0.40;

      ctx.save();
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, 14, 0, Math.PI * 2);
      ctx.strokeStyle = '#d8b4fe'; // Light purple/violet glow stroke
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#a855f7';
      ctx.stroke();
      ctx.restore();

      // 4. Render the solid neon center dot
      ctx.save();
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#a855f7'; // Purple center core matching the trailing dot
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#a855f7';
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Dynamically inject CSS style to hide default cursor globally
    const style = document.createElement('style');
    style.id = 'custom-cursor-hide-style';
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      /* Keep standard inputs feeling correct but with hidden default pointer */
      input, textarea, select, button, a {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      const styleElement = document.getElementById('custom-cursor-hide-style');
      if (styleElement) styleElement.remove();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999, // Ensure it is on top of everything
      }}
    />
  );
}

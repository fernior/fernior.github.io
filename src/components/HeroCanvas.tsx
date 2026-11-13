import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Track mouse
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Initialize nodes
    let nodes: Node[] = [];
    const nodeCount = Math.min(Math.floor((width * height) / 14000), 75);

    const initNodes = () => {
      nodes = [];
      const isDark = theme === 'dark';
      for (let i = 0; i < nodeCount; i++) {
        const radius = Math.random() * 1.8 + 1.2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius,
          baseRadius: radius,
          color: isDark ? (Math.random() > 0.8 ? '#38BDF8' : '#0284C7') : (Math.random() > 0.8 ? '#0284C7' : '#94A3B8'),
        });
      }
    };

    initNodes();

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        render();
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);
      const isDark = theme === 'dark';

      // Draw subtle grid points or background cyber ambient
      const maxDist = 135;

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Move
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Bounce
        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        // Mouse interaction
        const dxMouse = mouse.x - nodeA.x;
        const dyMouse = mouse.y - nodeA.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);

        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 1.5;
          nodeA.x -= (dxMouse / distMouse) * force;
          nodeA.y -= (dyMouse / distMouse) * force;
          nodeA.radius = nodeA.baseRadius * 1.8;
        } else {
          nodeA.radius = nodeA.baseRadius;
        }

        // Connect to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * (isDark ? 0.35 : 0.22);
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${opacity})` : `rgba(2, 132, 199, ${opacity})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeA.color;
        ctx.shadowColor = isDark ? '#38BDF8' : '#0284C7';
        ctx.shadowBlur = isDark ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Draw mouse node connection if within bounds
      if (mouse.x > 0 && mouse.y > 0 && mouse.x < width && mouse.y < height) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#38BDF8' : '#0284C7';
        ctx.fill();

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const dist = Math.hypot(mouse.x - node.x, mouse.y - node.y);
          if (dist < mouse.radius) {
            const opacity = (1 - dist / mouse.radius) * (isDark ? 0.6 : 0.4);
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${opacity})` : `rgba(2, 132, 199, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto w-full h-full opacity-65 transition-opacity duration-700"
      style={{ zIndex: 0 }}
    />
  );
};

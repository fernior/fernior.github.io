import React, { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(56, 189, 248, 0.12)',
  borderColor = 'rgba(56, 189, 248, 0.4)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isDark = theme === 'dark';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isDark
          ? 'bg-[#0D1527]/85 border-white/8 hover:border-sky-400/35 hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.18)]'
          : 'bg-white/90 border-slate-200/80 hover:border-sky-500/40 hover:shadow-[0_10px_30px_-5px_rgba(2,132,199,0.15)]'
      } backdrop-blur-xl ${className}`}
      {...props}
    >
      {/* Radial spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${
            isDark ? spotlightColor : 'rgba(2, 132, 199, 0.08)'
          }, transparent 70%)`,
        }}
      />
      
      {/* Subtle border highlight line */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${
            isDark ? borderColor : 'rgba(2, 132, 199, 0.4)'
          }, transparent 60%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

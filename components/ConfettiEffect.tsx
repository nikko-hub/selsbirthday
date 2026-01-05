
import React, { useEffect, useState } from 'react';

const ConfettiEffect: React.FC = () => {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    // A wider range of vibrant and pastel colors
    const colors = [
      '#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#fff1f2', // Pinks/Roses
      '#fbbf24', '#fcd34d', '#fef3c7', // Golds/Yellows
      '#8b5cf6', '#a78bfa', '#ddd6fe', // Purples
      '#2dd4bf', '#5eead4', '#ccfbf1', // Teals
      '#60a5fa', '#93c5fd', '#dbeafe', // Blues
      '#f97316', '#fb923c', '#ffedd5'  // Oranges
    ];
    
    const newPieces = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 12 + 4,
      delay: Math.random() * 15,
      duration: Math.random() * 12 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.3,
      shape: Math.random() > 0.5 ? '50%' : '2px' // Mix of circles and slightly rounded squares
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            borderRadius: p.shape,
            animation: `fall ${p.duration}s linear ${p.delay}s infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg) translateX(0); }
          25% { transform: translateY(25vh) rotate(180deg) translateX(15px); }
          50% { transform: translateY(50vh) rotate(360deg) translateX(-15px); }
          75% { transform: translateY(75vh) rotate(540deg) translateX(10px); }
          100% { transform: translateY(110vh) rotate(720deg) translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ConfettiEffect;


import React from 'react';

interface ButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'number' | 'operator' | 'action' | 'special';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  className = '', 
  variant = 'number' 
}) => {
  const baseStyles = "h-14 md:h-16 rounded-2xl flex items-center justify-center text-xl font-bold transition-all duration-200 active:scale-90 select-none relative overflow-hidden group shadow-lg";
  
  const variants = {
    // Frosted white glass for numbers
    number: "bg-gradient-to-br from-white/50 to-white/20 backdrop-blur-xl border border-white/60 text-slate-800 hover:from-white/70 hover:to-white/40 hover:shadow-white/20",
    
    // Subtle orange glass for operators
    operator: "bg-gradient-to-br from-orange-500/20 to-orange-500/5 backdrop-blur-xl border border-orange-500/30 text-orange-700 hover:from-orange-500/30 hover:to-orange-500/10 hover:shadow-orange-500/20",
    
    // Muted slate glass for actions (AC, +/-, %)
    action: "bg-gradient-to-br from-slate-300/40 to-slate-200/10 backdrop-blur-xl border border-slate-300/50 text-slate-700 hover:from-slate-300/60 hover:to-slate-200/30",
    
    // Vibrant indigo glass for equals
    special: "bg-gradient-to-br from-indigo-600/30 to-indigo-600/10 backdrop-blur-xl border border-indigo-500/40 text-indigo-800 hover:from-indigo-600/40 hover:to-indigo-600/20 hover:shadow-indigo-600/30",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Glossy highlight overlay */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
      
      <span className="relative z-10 drop-shadow-sm">
        {label}
      </span>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 pointer-events-none"></div>
    </button>
  );
};

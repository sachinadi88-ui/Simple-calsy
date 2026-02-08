
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
  const baseStyles = "h-14 md:h-16 rounded-2xl flex items-center justify-center text-xl font-semibold transition-all active:scale-95 active:bg-white/50 select-none";
  
  const variants = {
    number: "bg-white/40 backdrop-blur-md border border-white/40 text-slate-800 hover:bg-white/60 shadow-sm",
    operator: "bg-orange-500/10 backdrop-blur-md border border-orange-500/20 text-orange-600 hover:bg-orange-500/20 shadow-sm",
    action: "bg-slate-200/30 backdrop-blur-md border border-slate-200/30 text-slate-600 hover:bg-slate-200/50",
    special: "bg-indigo-600/10 backdrop-blur-md border border-indigo-600/20 text-indigo-700 hover:bg-indigo-600/20 shadow-sm",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

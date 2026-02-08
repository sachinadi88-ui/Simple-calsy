
import React from 'react';
import { Calculator } from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-8 relative">
      {/* Decorative Orbs */}
      <div className="absolute top-[5%] left-[15%] w-72 h-72 bg-indigo-200/40 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[10%] w-80 h-80 bg-orange-200/30 blur-[100px] rounded-full pointer-events-none"></div>

      <header className="mb-10 text-center px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Prism<span className="text-indigo-600 font-light">Calc</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-semibold max-w-md">
          Crystal clear calculations with a minimalist touch.
        </p>
      </header>

      <main className="w-full flex-1 flex items-center justify-center">
        <Calculator />
      </main>

      <footer className="mt-12 mb-4 text-slate-400 text-[10px] font-bold tracking-widest uppercase">
        Glassmorphism UI &copy; 2025
      </footer>
    </div>
  );
};

export default App;

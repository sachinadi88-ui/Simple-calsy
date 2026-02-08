
import React, { useState } from 'react';
import { Button } from './Button';
import { Operator, CalculationState } from '../types';

export const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculationState>({
    display: '0',
    previousValue: null,
    operator: null,
    waitingForNext: false,
    history: []
  });

  const clear = () => {
    setState({
      display: '0',
      previousValue: null,
      operator: null,
      waitingForNext: false,
      history: []
    });
  };

  const handleNumber = (num: string) => {
    setState(prev => {
      if (prev.waitingForNext) {
        return { ...prev, display: num, waitingForNext: false };
      }
      return {
        ...prev,
        display: prev.display === '0' ? num : prev.display + num
      };
    });
  };

  const handleOperator = (nextOp: Operator) => {
    if (state.previousValue === null) {
      setState(prev => ({
        ...prev,
        previousValue: prev.display,
        operator: nextOp,
        waitingForNext: true
      }));
    } else if (state.operator) {
      const result = performCalculation();
      setState(prev => ({
        ...prev,
        display: String(result),
        previousValue: String(result),
        operator: nextOp,
        waitingForNext: true
      }));
    }
  };

  const performCalculation = () => {
    const { display, previousValue, operator } = state;
    const current = parseFloat(display);
    const prev = parseFloat(previousValue || '0');

    switch (operator) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '*': return prev * current;
      case '/': return current !== 0 ? prev / current : 0;
      default: return current;
    }
  };

  const handleEqual = () => {
    if (!state.operator || state.previousValue === null) return;

    const result = performCalculation();
    const expression = `${state.previousValue} ${state.operator} ${state.display} = ${result}`;

    setState(prev => ({
      ...prev,
      display: String(result),
      previousValue: null,
      operator: null,
      waitingForNext: true,
      history: [expression, ...prev.history].slice(0, 5)
    }));
  };

  const toggleSign = () => {
    setState(prev => ({
      ...prev,
      display: (parseFloat(prev.display) * -1).toString()
    }));
  };

  const handlePercent = () => {
    setState(prev => ({
      ...prev,
      display: (parseFloat(prev.display) / 100).toString()
    }));
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full px-4 max-w-md mx-auto">
      {/* Calculator Main Body */}
      <div className="w-full bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-2xl p-6 md:p-8 flex flex-col gap-6">
        {/* Display Area */}
        <div className="flex flex-col items-end justify-center min-h-[100px] px-4">
          <div className="text-slate-400 text-lg font-medium h-6 overflow-hidden">
            {state.previousValue} {state.operator}
          </div>
          <div className="text-slate-900 text-6xl md:text-7xl font-light tracking-tight truncate w-full text-right">
            {state.display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          <Button label="AC" onClick={clear} variant="action" />
          <Button label="+/-" onClick={toggleSign} variant="action" />
          <Button label="%" onClick={handlePercent} variant="action" />
          <Button label="÷" onClick={() => handleOperator('/')} variant="operator" />

          <Button label="7" onClick={() => handleNumber('7')} />
          <Button label="8" onClick={() => handleNumber('8')} />
          <Button label="9" onClick={() => handleNumber('9')} />
          <Button label="×" onClick={() => handleOperator('*')} variant="operator" />

          <Button label="4" onClick={() => handleNumber('4')} />
          <Button label="5" onClick={() => handleNumber('5')} />
          <Button label="6" onClick={() => handleNumber('6')} />
          <Button label="-" onClick={() => handleOperator('-')} variant="operator" />

          <Button label="1" onClick={() => handleNumber('1')} />
          <Button label="2" onClick={() => handleNumber('2')} />
          <Button label="3" onClick={() => handleNumber('3')} />
          <Button label="+" onClick={() => handleOperator('+')} variant="operator" />

          <Button label="0" onClick={() => handleNumber('0')} className="col-span-2" />
          <Button label="." onClick={() => handleNumber('.')} />
          <Button label="=" onClick={handleEqual} variant="special" />
        </div>
      </div>

      {/* History Snippet - Moved below calculator */}
      {state.history.length > 0 && (
        <div className="w-full bg-white/20 backdrop-blur-lg border border-white/40 rounded-[30px] p-6 shadow-lg animate-fadeIn">
          <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3 text-center">Recent Calculations</h4>
          <div className="flex flex-col gap-2">
            {state.history.map((item, i) => (
              <div key={i} className="text-slate-600 text-sm text-center font-medium border-b border-slate-200/50 pb-1 last:border-0">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Simple animation for new results
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}
`;
document.head.appendChild(style);

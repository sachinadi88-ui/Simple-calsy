
export type Operator = '+' | '-' | '*' | '/' | null;

export interface CalculationState {
  display: string;
  previousValue: string | null;
  operator: Operator;
  waitingForNext: boolean;
  history: string[];
}

// Added AIExplanation interface to resolve missing exported member error
export interface AIExplanation {
  explanation: string;
  steps: string[];
  context: string;
}

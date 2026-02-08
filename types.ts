export type Operator = '+' | '-' | '*' | '/' | null;

export interface CalculationState {
  display: string;
  previousValue: string | null;
  operator: Operator;
  waitingForNext: boolean;
  history: string[];
}

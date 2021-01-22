export const CLEAR = 'CLEAR';

export const SUM = 'SUM';
export const SUBTRACT = 'SUBTRACT';
export const MULTIPLY = 'MULTIPLY';
export const DIVIDE = 'DIVIDE';

export const handleCalculate = (a,b, op) => ({
  type: op,
  a,
  b,
});

export const clear = (a,b) => ({
  type: CLEAR,
});

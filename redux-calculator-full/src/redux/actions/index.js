export const SUM = 'SUM';
export const SUBTRACT = 'SUBTRACT';
export const MULTIPLY = 'MULTIPLY';
export const DIVIDE = 'DIVIDE';
export const CLEAR = 'CLEAR';

export const sum = (a,b) => ({
  type: SUM,
  a,
  b,
});

export const subtract = (a,b) => ({
  type: SUBTRACT,
  a,
  b,
});

export const multiply = (a,b) => ({
  type: MULTIPLY,
  a,
  b,
});

export const divide = (a,b) => ({
  type: DIVIDE,
  a,
  b,
});

export const clear = (a,b) => ({
  type: CLEAR,
});

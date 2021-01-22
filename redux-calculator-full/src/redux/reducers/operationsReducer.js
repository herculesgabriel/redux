import { CLEAR, SUM, SUBTRACT, MULTIPLY, DIVIDE } from '../actions'

const INITIAL_STATE = {
  history: [],
  result: 0,
};



export const operationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUM:
      return {
        ...state,
        result: action.a + action.b,
        history: [
          ...state.history,
          `${action.a} + ${action.b} = ${action.a + action.b}`,
        ],
      };
      case SUBTRACT:
        return {
          ...state,
          result: action.a - action.b,
          history: [
            ...state.history,
            `${action.a} - ${action.b} = ${action.a - action.b}`,
          ],
        };
      case MULTIPLY:
        return {
          ...state,
          result: action.a * action.b,
          history: [
            ...state.history,
            `${action.a} * ${action.b} = ${action.a * action.b}`,
          ],
        };
      case DIVIDE:
        return {
          ...state,
          result: action.a / action.b,
          history: [
            ...state.history,
            `${action.a} / ${action.b} = ${action.a / action.b}`,
          ],
        };
      case CLEAR:
        return {
          ...state,
          result: 0,
          history: [],
        };
    default:
      return state;
  }
};

export default operationsReducer;

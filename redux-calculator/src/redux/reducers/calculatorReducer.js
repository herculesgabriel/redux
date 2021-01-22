import { MULTIPLY } from '../actions'

const INITIAL_STATE = {
  history: [],
  result: 0,
};

const calculatorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MULTIPLY:
      return {
        ...state,
        result: action.a * action.b,
        history: [
          ...state.history,
          `${action.a} x ${action.b} = ${action.a * action.b}`,
        ],
      };
    default:
      return state;
  }
};

export default calculatorReducer;

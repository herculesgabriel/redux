import { combineReducers } from 'redux';
import calculatorReducer from './calculatorReducer';

const rootReducer = combineReducers({
  calculatorReducer,
});

export default rootReducer;

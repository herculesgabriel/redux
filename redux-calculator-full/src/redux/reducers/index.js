import { combineReducers } from 'redux'
import { operationsReducer } from './operationsReducer';

const rootReducer = combineReducers({
  operationsReducer,
  //reducer2,
  //...
})

export default rootReducer;

import { combineReducers } from 'redux'
import constructorReducer from './reducers/constructor'

const rootReducer = combineReducers({
  constructor: constructorReducer,
})

export default rootReducer
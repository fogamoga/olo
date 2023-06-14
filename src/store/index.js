import { configureStore } from '@reduxjs/toolkit'
import constructorReducer from './reducers/constructor'

export default configureStore({
  reducer: constructorReducer
})
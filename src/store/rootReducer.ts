import { combineReducers } from '@reduxjs/toolkit'
import { cardSlice } from './slices/cardSlice';

export const rootReducer = combineReducers({
  [cardSlice.name]: cardSlice.reducer,
})

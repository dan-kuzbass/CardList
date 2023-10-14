import { createSlice } from '@reduxjs/toolkit'

export interface CardState {
  cardList?: Array<any>
}

const initialState: CardState = {}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

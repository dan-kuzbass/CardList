import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface ICardItem {
  label1: string
  label2: string
  label3: string
  label4: string
  label5: string
  lastUpdated: number
}

export interface CardState {
  cardList?: Array<ICardItem>
}

const initialState: CardState = {
  cardList: [
    {
      label1: 'fdf',
      label2: 'dfd',
      label3: 'asd',
      label4: 'fff',
      label5: 'fdfd',
      lastUpdated: 1697291197281,
    },
  ],
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export const selectCardList = (state: RootState) => state.card.cardList

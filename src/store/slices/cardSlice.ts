import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import generateRandomString from '../../utils/generateRandomString'
import { CardState, IChangeCardPayload, IFetchCardListResponse } from "./cardSliceTypes";

const initialState: CardState = {}

const getNewCards = (cardArrayLength: number) => {
  const newCardList = []
  for (let i = 0; i < cardArrayLength; i++) {
    newCardList.push({
      label1: generateRandomString(i + 3),
      label2: generateRandomString(i + 3),
      label3: generateRandomString(i + 3),
      label4: generateRandomString(i + 3),
      label5: generateRandomString(i + 3),
      lastUpdated: Date.now(),
    })
  }
  return newCardList
}

export const fetchCardList = createAsyncThunk(
  'cards/fetchCardList',
  async (_, { rejectWithValue }) => {
    try {
      const response: IFetchCardListResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: getNewCards(10) })
        }, 1000)
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const fetchMoreCardList = createAsyncThunk(
  'cards/fetchMoreCardList',
  async (_, { rejectWithValue }) => {
    try {
      const response: IFetchCardListResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: getNewCards(5) })
        }, 1000)
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    changeCard: (state, action: PayloadAction<IChangeCardPayload>) => {
      if (state.cardList && action.payload.index !== -1) {
        state.cardList[action.payload.index] = {
          ...state.cardList[action.payload.index],
          [action.payload.label]: action.payload.value,
          lastUpdated: Date.now(),
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardList.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCardList.fulfilled, (state, res) => {
      state.cardList = res.payload
      state.isLoading = false
    })
    builder.addCase(fetchMoreCardList.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(fetchMoreCardList.fulfilled, (state, res) => {
      state.isFetching = false
      if (state?.cardList) state.cardList = [...state.cardList, ...res.payload]
    })
  },
})

export const selectCardList = (state: RootState) => state.card.cardList

export const selectIsLoadingCardList = (state: RootState) =>
  state.card.isLoading

export const selectIsFetchingCardList = (state: RootState) =>
  state.card.isFetching

export const { changeCard } = cardSlice.actions

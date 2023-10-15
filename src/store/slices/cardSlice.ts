import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store'
import generateRandomString from '../../utils/generateRandomString'

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
  isLoading?: boolean
  isFetching?: boolean
}

interface IFetchCardListResponse {
  data: Array<ICardItem>
}

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

export const fetchCardList = createAsyncThunk('cards/fetchCardList', async (_, { rejectWithValue }) => {
  try {
    const response: IFetchCardListResponse = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getNewCards(10) });
      }, 1000);
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const fetchMoreCardList = createAsyncThunk('cards/fetchMoreCardList', async (_, { rejectWithValue }) => {
  try {
    const response: IFetchCardListResponse = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getNewCards(5) });
      }, 1000);
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});


export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
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

// eslint-disable-next-line require-jsdoc
export const selectCardList = (state: RootState) => state.card.cardList

// eslint-disable-next-line require-jsdoc
export const selectIsLoadingCardList = (state: RootState) => state.card.isLoading

// eslint-disable-next-line require-jsdoc
export const selectIsFetchingCardList = (state: RootState) => state.card.isFetching

import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logger from 'redux-logger'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from 'redux-persist'

import { rootReducer } from './rootReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
}

const makeMiddleware = (getDefaultMiddleware: (arg0: { serializableCheck: { ignoredActions: any[] } }) => any[]) => {
  const newMiddleware = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
  if (process.env.NODE_ENV === 'development') {
    newMiddleware.concat(logger)
  }
  return newMiddleware
}

const makeStore = () =>
  configureStore({
    reducer: persistReducer(
      persistConfig,
      rootReducer,
    ) as unknown as typeof rootReducer,
    middleware: makeMiddleware,
  })

export const appStore = makeStore()
export const persistedStore = persistStore(appStore)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>

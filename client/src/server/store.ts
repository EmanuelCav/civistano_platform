import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { thunk } from 'redux-thunk'

import reducers from './reducer/reducers'

import { key_storage } from '@/config/config'

const persistedReducer = persistReducer({
    key: `${key_storage}`,
    version: 1,
    storage
}, reducers)

export const makeStore = () => {
    return configureStore({
      reducer: {}
    })
  }

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk),
    devTools: process.env.NODE_ENV !== 'production'
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
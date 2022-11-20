import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import currencyExchangeReducer from "../utils/currencyExchangeSlice";

import { setupListeners } from '@reduxjs/toolkit/query'
import { exchangeRateApi } from '../apis/services';

const reducers = combineReducers({
  currencyExchangeReducer,
  [exchangeRateApi.reducerPath]: exchangeRateApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['navigation'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(exchangeRateApi.middleware),
});

setupListeners(store.dispatch);

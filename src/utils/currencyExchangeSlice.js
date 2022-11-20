import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  conversionHistory: {},
}

export const currencyExchangeSlice = createSlice({
  name: "currencyExchange",
  initialState,
  reducers: {
    addHistory: (state, action) => {
      const conversionID = uuidv4();
      state.conversionHistory[conversionID] = action.payload;
    },
    deleteHistory: (state, action) => {
      delete state.conversionHistory[action.payload];
    },
  },
})

export const { addHistory, deleteHistory } = currencyExchangeSlice.actions;

export default currencyExchangeSlice.reducer;

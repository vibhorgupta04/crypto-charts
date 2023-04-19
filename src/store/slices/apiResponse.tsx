import { createSlice } from '@reduxjs/toolkit';

const apiResponse = createSlice({
  name: 'apiData',
  initialState: {
    market: {},
    // cryptoData: 'CryptoCurrency',
  },
  reducers: {
    marketCap(state: any, action: any) {
      state.market = action.payload;
    },
  },
});

export const { marketCap } = apiResponse.actions;
export const apiResponseReducer = apiResponse.reducer;

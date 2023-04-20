import { createSlice } from '@reduxjs/toolkit';

const apiResponse = createSlice({
  name: 'apiData',
  initialState: {
    market: {},
    trendCoin: [],
    // cryptoData: 'CryptoCurrency',
  },
  reducers: {
    marketCap(state: any, action: any) {
      state.market = action.payload;
    },
    trendingCoin(state: any, action: any) {
      state.trendCoin = action.payload;
    },
  },
});

export const { marketCap, trendingCoin } = apiResponse.actions;
export const apiResponseReducer = apiResponse.reducer;

import { createSlice } from '@reduxjs/toolkit';

const apiResponse = createSlice({
  name: 'apiData',
  initialState: {
    market: {},
    trendCoin: [],
    cryptoData: {},
  },
  reducers: {
    marketCap(state: any, action: any) {
      state.market = action.payload;
    },
    trendingCoin(state: any, action: any) {
      state.trendCoin = action.payload;
    },
    searchCryptoData(state: any, action: any) {
      state.cryptoData = action.payload;
    },
  },
});

export const { marketCap, trendingCoin, searchCryptoData } =
  apiResponse.actions;
export const apiResponseReducer = apiResponse.reducer;

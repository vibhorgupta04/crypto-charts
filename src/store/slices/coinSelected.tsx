import { createSlice } from '@reduxjs/toolkit';

const coinSelected = createSlice({
  name: 'coinData',
  initialState: {
    coin: 'bitcoin',
    // market: {},
    // trendCoin: [],
  },
  reducers: {
    coinValue(state: any, action: any) {
      state.coin = action.payload;
    },
    // trendingCoin(state: any, action: any) {
    //   state.trendCoin = action.payload;
    // },
  },
});

export const { coinValue } = coinSelected.actions;
export const coinResponseReducer = coinSelected.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiDataState } from '../../components/types';

const apiResponse = createSlice({
  name: 'apiData',
  initialState: {
    market: {},
    trendCoin: [],
    cryptoData: {},
  } as ApiDataState,
  reducers: {
    marketCap(state: ApiDataState, action: PayloadAction<Record<string, any>>) {
      state.market = action.payload;
    },
    trendingCoin(state: ApiDataState, action: PayloadAction<any[]>) {
      state.trendCoin = action.payload;
    },
    searchCryptoData(state: ApiDataState, action: PayloadAction<Record<string, any>>) {
      state.cryptoData = action.payload;
    },
  },
});

export default apiResponse;


export const { marketCap, trendingCoin, searchCryptoData } =
  apiResponse.actions;
export const apiResponseReducer = apiResponse.reducer;

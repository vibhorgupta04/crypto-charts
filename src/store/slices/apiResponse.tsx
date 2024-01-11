import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApiDataState {
  market: Record<string, any>;
  trendCoin: any[];
  cryptoData: Record<string, any>;
}

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

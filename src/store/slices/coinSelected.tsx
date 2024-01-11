import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoinSelectedState {
  coin: string;
}

const coinSelected = createSlice({
  name: 'coinData',
  initialState: {
    coin: 'bitcoin',
  } as CoinSelectedState,
  reducers: {
    coinValue(state: CoinSelectedState, action: PayloadAction<string>) {
      state.coin = action.payload;
    },
  },
});

export default coinSelected;


export const { coinValue } = coinSelected.actions;
export const coinResponseReducer = coinSelected.reducer;

import { createSlice } from '@reduxjs/toolkit';

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    chartData: 'Bar Chart',
    cryptoData: 'CryptoCurrency',
  },
  reducers: {
    chartType(state: any, action: any) {
      state.chartData = action.payload;
    },
    cryptocurrency(state: any, action: any) {
      state.cryptoData = action.payload;
    },
  },
});

export const { chartType, cryptocurrency } = dropdownSlice.actions;
export const dropdownReducer = dropdownSlice.reducer;

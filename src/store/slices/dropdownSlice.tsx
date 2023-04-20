import { createSlice } from '@reduxjs/toolkit';

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    chartData: 'Bar Chart',
    cryptoData: 'CryptoCurrency',
    currencyCountry: 'INR',
  },
  reducers: {
    chartType(state: any, action: any) {
      state.chartData = action.payload;
    },
    cryptocurrency(state: any, action: any) {
      state.cryptoData = action.payload;
    },
    currency(state: any, action: any) {
      state.currencyCountry = action.payload;
    },
  },
});

export const { chartType, cryptocurrency, currency } = dropdownSlice.actions;
export const dropdownReducer = dropdownSlice.reducer;

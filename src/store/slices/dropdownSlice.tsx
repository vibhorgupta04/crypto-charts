import { createSlice } from '@reduxjs/toolkit';

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    chartData: 'Line',
    cryptoData: 'bitcoin',
    currencyCountry: 'INR',
    daySelected: 7,
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
    days(state: any, action: any) {
      state.daySelected = action.payload;
    },
  },
});

export const { chartType, cryptocurrency, currency, days } =
  dropdownSlice.actions;
export const dropdownReducer = dropdownSlice.reducer;

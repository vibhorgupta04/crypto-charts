import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DropdownState {
  chartData: string;
  cryptoData: string;
  currencyCountry: string;
  daySelected: number;
  selectedCoins: string[];
}

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    chartData: "Line",
    cryptoData: "bitcoin",
    currencyCountry: "INR",
    daySelected: 7,
    selectedCoins: [],
  } as DropdownState,
  reducers: {
    chartType(state: DropdownState, action: PayloadAction<string>) {
      state.chartData = action.payload;
    },
    cryptocurrency(state: DropdownState, action: PayloadAction<string>) {
      state.cryptoData = action.payload;
    },
    currency(state: DropdownState, action: PayloadAction<string>) {
      state.currencyCountry = action.payload;
    },
    days(state: DropdownState, action: PayloadAction<number>) {
      state.daySelected = action.payload;
    },
    coins(state: DropdownState, action: PayloadAction<string[]>) {
      state.selectedCoins = action.payload;
    },
  },
});

export const { chartType, cryptocurrency, currency, days, coins } =
  dropdownSlice.actions;
export const dropdownReducer = dropdownSlice.reducer;

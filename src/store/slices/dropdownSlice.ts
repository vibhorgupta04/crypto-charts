import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyOptions, DropdownState } from "../../components/types";

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
    currency(state: DropdownState, action: PayloadAction<CurrencyOptions>) {
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

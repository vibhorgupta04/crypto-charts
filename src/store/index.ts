import { configureStore } from "@reduxjs/toolkit";

import {
  dropdownReducer,
  chartType,
  cryptocurrency,
  currency,
  days,
} from "./slices/dropdownSlice";

import {
  apiResponseReducer,
  marketCap,
  trendingCoin,
  searchCryptoData,
} from "./slices/apiResponse";

import { coinResponseReducer, coinValue } from "./slices/coinSelected";
import {
  ApiDataState,
  CoinSelectedState,
  DropdownState,
} from "../components/types";

export interface IStore {
  dropdown: DropdownState;
  api: ApiDataState;
  coin: CoinSelectedState;
}

const store = configureStore({
  reducer: {
    dropdown: dropdownReducer,
    api: apiResponseReducer,
    coin: coinResponseReducer,
  },
});

export {
  store,
  chartType,
  cryptocurrency,
  marketCap,
  trendingCoin,
  currency,
  days,
  coinValue,
  searchCryptoData,
};

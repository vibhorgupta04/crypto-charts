import { configureStore } from '@reduxjs/toolkit';

import {
  dropdownReducer,
  chartType,
  cryptocurrency,
  currency,
} from './slices/dropdownSlice';

import {
  apiResponseReducer,
  marketCap,
  trendingCoin,
  searchCryptoData,
} from './slices/apiResponse';

import { coinResponseReducer, coinValue } from './slices/coinSelected';

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
  coinValue,
  searchCryptoData,
};

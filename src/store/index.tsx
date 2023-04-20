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
} from './slices/apiResponse';

const store = configureStore({
  reducer: {
    dropdown: dropdownReducer,
    api: apiResponseReducer,
  },
});

export { store, chartType, cryptocurrency, marketCap, trendingCoin, currency };

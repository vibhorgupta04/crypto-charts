import { configureStore } from '@reduxjs/toolkit';

import {
  dropdownReducer,
  chartType,
  cryptocurrency,
} from './slices/dropdownSlice';

const store = configureStore({
  reducer: {
    dropdown: dropdownReducer,
  },
});

export { store, chartType, cryptocurrency };

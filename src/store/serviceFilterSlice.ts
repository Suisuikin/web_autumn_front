import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServiceFilterState, ServiceFilter } from './types/filter.types';

const initialState: ServiceFilterState = {
  filters: {
    name: '',
    priceMin: 0,
    priceMax: 10000,
    dateFrom: '',
    dateTo: '',
  },
  lastAppliedFilters: {
    name: '',
    priceMin: 0,
    priceMax: 10000,
    dateFrom: '',
    dateTo: '',
  },
};

export const serviceFilterSlice = createSlice({
  name: 'serviceFilter',
  initialState,
  reducers: {
    setFilterName: (
      state: ServiceFilterState,
      action: PayloadAction<string>,
    ) => {
      state.filters.name = action.payload;
    },

    setFilterPriceMin: (
      state: ServiceFilterState,
      action: PayloadAction<number>,
    ) => {
      state.filters.priceMin = action.payload;
    },

    setFilterPriceMax: (
      state: ServiceFilterState,
      action: PayloadAction<number>,
    ) => {
      state.filters.priceMax = action.payload;
    },

    setFilterDateFrom: (
      state: ServiceFilterState,
      action: PayloadAction<string>,
    ) => {
      state.filters.dateFrom = action.payload;
    },

    setFilterDateTo: (
      state: ServiceFilterState,
      action: PayloadAction<string>,
    ) => {
      state.filters.dateTo = action.payload;
    },

    applyFilters: (state: ServiceFilterState) => {
      state.lastAppliedFilters = { ...state.filters };
    },

    resetFilters: (state: ServiceFilterState) => {
      state.filters = { ...initialState.filters };
      state.lastAppliedFilters = { ...initialState.filters };
    },

    restoreFilters: (
      state: ServiceFilterState,
      action: PayloadAction<ServiceFilter>,
    ) => {
      state.lastAppliedFilters = action.payload;
      state.filters = action.payload;
    },
  },
});

export const {
  setFilterName,
  setFilterPriceMin,
  setFilterPriceMax,
  setFilterDateFrom,
  setFilterDateTo,
  applyFilters,
  resetFilters,
  restoreFilters,
} = serviceFilterSlice.actions;

export default serviceFilterSlice.reducer;

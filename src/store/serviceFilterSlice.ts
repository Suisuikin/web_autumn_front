// src/store/serviceFilterSlice.ts
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
  globalSearchQuery: '', // Инициализация нового поля
};

export const serviceFilterSlice = createSlice({
  name: 'serviceFilter',
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filters.name = action.payload;
    },
    setFilterPriceMin: (state, action: PayloadAction<number>) => {
      state.filters.priceMin = action.payload;
    },
    setFilterPriceMax: (state, action: PayloadAction<number>) => {
      state.filters.priceMax = action.payload;
    },
    setFilterDateFrom: (state, action: PayloadAction<string>) => {
      state.filters.dateFrom = action.payload;
    },
    setFilterDateTo: (state, action: PayloadAction<string>) => {
      state.filters.dateTo = action.payload;
    },
    applyFilters: (state) => {
      state.lastAppliedFilters = { ...state.filters };
    },
    resetFilters: (state) => {
      state.filters = { ...initialState.filters };
      state.lastAppliedFilters = { ...initialState.filters };
    },
    restoreFilters: (state, action: PayloadAction<ServiceFilter>) => {
      state.lastAppliedFilters = action.payload;
      state.filters = action.payload;
    },
    // Новый редьюсер для поиска
    setGlobalSearchQuery: (state, action: PayloadAction<string>) => {
      state.globalSearchQuery = action.payload;
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
  setGlobalSearchQuery, // Экспорт нового экшена
} = serviceFilterSlice.actions;

export default serviceFilterSlice.reducer;

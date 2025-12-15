// src/store/types/filter.types.ts
export interface ServiceFilter {
  name: string;
  priceMin: number;
  priceMax: number;
  dateFrom: string;
  dateTo: string;
}

export interface ServiceFilterState {
  filters: ServiceFilter;
  lastAppliedFilters: ServiceFilter;
}

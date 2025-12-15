import { useAppDispatch, useAppSelector } from '../store/store';
import {
  setFilterName,
  setFilterPriceMin,
  setFilterPriceMax,
  setFilterDateFrom,
  setFilterDateTo,
  applyFilters,
  resetFilters,
} from '../store/serviceFilterSlice';
import { ServiceFilter } from '../store/types/filter.types';

interface UseFilterReturn {
  filters: ServiceFilter;
  lastAppliedFilters: ServiceFilter;
  setName: (name: string) => void;
  setPriceMin: (price: number) => void;
  setPriceMax: (price: number) => void;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
  apply: () => void;
  reset: () => void;
}

export const useFilter = (): UseFilterReturn => {
  const dispatch = useAppDispatch();
  const { filters, lastAppliedFilters } = useAppSelector(
    (state) => state.serviceFilter
  );

  return {
    filters,
    lastAppliedFilters,
    setName: (name) => dispatch(setFilterName(name)),
    setPriceMin: (price) => dispatch(setFilterPriceMin(price)),
    setPriceMax: (price) => dispatch(setFilterPriceMax(price)),
    setDateFrom: (date) => dispatch(setFilterDateFrom(date)),
    setDateTo: (date) => dispatch(setFilterDateTo(date)),
    apply: () => dispatch(applyFilters()),
    reset: () => dispatch(resetFilters()),
  };
};

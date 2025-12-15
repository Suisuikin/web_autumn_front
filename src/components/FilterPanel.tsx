import React, { FC } from 'react';
import { useFilter } from '../hooks/useFilter';
import { ServiceFilter } from '../store/types/filter.types';

interface FilterPanelProps {
  filters: ServiceFilter;
  onApply: () => void;
}

const FilterPanel: FC<FilterPanelProps> = ({ filters, onApply }) => {
  const { setName, setPriceMin, setPriceMax, setDateFrom, setDateTo } =
    useFilter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPriceMin(parseInt(e.target.value) || 0);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPriceMax(parseInt(e.target.value) || 10000);
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDateTo(e.target.value);
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label htmlFor="name-filter">Название</label>
        <input
          id="name-filter"
          type="text"
          placeholder="Поиск по названию"
          value={filters.name}
          onChange={handleNameChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="price-min">Цена от</label>
        <input
          id="price-min"
          type="number"
          min="0"
          value={filters.priceMin}
          onChange={handlePriceMinChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="price-max">Цена до</label>
        <input
          id="price-max"
          type="number"
          min="0"
          value={filters.priceMax}
          onChange={handlePriceMaxChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="date-from">Дата от</label>
        <input
          id="date-from"
          type="date"
          value={filters.dateFrom}
          onChange={handleDateFromChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="date-to">Дата до</label>
        <input
          id="date-to"
          type="date"
          value={filters.dateTo}
          onChange={handleDateToChange}
        />
      </div>

      <button className="filter-btn" onClick={onApply}>
        Применить
      </button>
    </div>
  );
};

export default FilterPanel;

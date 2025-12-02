import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FilterParams } from '../types';

interface ServiceFilterProps {
  onFilterChange: (filters: FilterParams) => void;
  initialFilters?: FilterParams;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({
  onFilterChange,
  initialFilters = {}
}) => {
  const [search, setSearch] = useState(initialFilters.search || '');
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice?.toString() || '');
  const [dateFrom, setDateFrom] = useState(initialFilters.dateFrom || '');
  const [dateTo, setDateTo] = useState(initialFilters.dateTo || '');

  useEffect(() => {
    // Автоматическое применение фильтров при изменении
    const timer = setTimeout(() => {
      handleFilter();
    }, 500); // Debounce

    return () => clearTimeout(timer);
  }, [search, minPrice, maxPrice, dateFrom, dateTo]);

  const handleFilter = () => {
    const filters: FilterParams = {};

    if (search) filters.search = search;
    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    if (dateFrom) filters.dateFrom = dateFrom;
    if (dateTo) filters.dateTo = dateTo;

    onFilterChange(filters);
  };

  const handleReset = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    setDateFrom('');
    setDateTo('');
    onFilterChange({});
  };

  return (
    <Form className="mb-4 p-4 bg-light rounded">
      <Row className="g-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Поиск по названию</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название услуги..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Минимальная цена</Form.Label>
            <Form.Control
              type="number"
              placeholder="От..."
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Максимальная цена</Form.Label>
            <Form.Control
              type="number"
              placeholder="До..."
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Дата от</Form.Label>
            <Form.Control
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Дата до</Form.Label>
            <Form.Control
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Button variant="secondary" onClick={handleReset} className="w-100">
            Сбросить фильтры
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ServiceFilter;

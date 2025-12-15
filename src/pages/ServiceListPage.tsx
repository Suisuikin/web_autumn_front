import { FC, useEffect, useState } from 'react';
import { useFilter } from '../hooks/useFilter';
import { Service } from '../store/types/service.types';
import FilterPanel from '../components/FilterPanel';
import ServiceCard from '../components/ServiceCard';
import '../styles/ServiceListPage.css';

interface ServiceListPageProps {
  title?: string;
}

const ServiceListPage: FC<ServiceListPageProps> = ({ title = 'Услуги' }) => {
  const { filters, lastAppliedFilters, apply } = useFilter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchServices();
  }, [lastAppliedFilters]);

  const fetchServices = async (): Promise<void> => {
    setLoading(true);
    try {
      const filtered = getMockServices().filter((service) => {
        const matchesName = service.name
          .toLowerCase()
          .includes(lastAppliedFilters.name.toLowerCase());
        const matchesPrice =
          service.price >= lastAppliedFilters.priceMin &&
          service.price <= lastAppliedFilters.priceMax;
        const matchesDate =
          !lastAppliedFilters.dateFrom ||
          service.date >= lastAppliedFilters.dateFrom;

        return matchesName && matchesPrice && matchesDate;
      });

      setServices(filtered);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ошибка загрузки';
      setError(errorMessage);
      setServices(getMockServices());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-list-page">
      <header className="page-header">
        <h1>{title}</h1>
      </header>

      <FilterPanel filters={filters} onApply={apply} />

      <div className="services-container">
        {loading && <p className="loading">Загрузка...</p>}
        {error && <p className="error">Ошибка: {error}</p>}
        {services.length === 0 ? (
          <p className="no-services">Услуги не найдены</p>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function getMockServices(): Service[] {
  return [
    {
      id: 1,
      name: 'Номер люкс',
      price: 15000,
      date: '2025-01-15',
      image: 'https://via.placeholder.com/400x300?text=Люкс',
      description: 'Просторный номер с видом на город',
      status: 'active',
    },
    {
      id: 2,
      name: 'Номер стандарт',
      price: 8000,
      date: '2025-01-10',
      image: 'https://via.placeholder.com/400x300?text=Стандарт',
      description: 'Удобный номер для делового человека',
      status: 'active',
    },
    {
      id: 3,
      name: 'Номер эконом',
      price: 4500,
      date: '2025-01-20',
      image: 'https://via.placeholder.com/400x300?text=Эконом',
      description: 'Доступный вариант размещения',
      status: 'active',
    },
  ];
}

export default ServiceListPage;

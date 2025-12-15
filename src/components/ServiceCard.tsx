import React, { FC } from 'react';
import { Service } from '../store/types/service.types';

interface ServiceCardProps {
  service: Service;
  onSelect?: (id: number) => void;
}

const ServiceCard: FC<ServiceCardProps> = ({ service, onSelect }) => {
  const handleClick = (): void => {
    if (onSelect) {
      onSelect(service.id);
    }
  };

  return (
    <div className="service-card" onClick={handleClick}>
      <img
        src={service.image || 'https://via.placeholder.com/400x300?text=No+Image'}
        alt={service.name}
      />
      <div className="service-card-content">
        <h3 className="service-card-title">{service.name}</h3>
        <p className="service-card-price">
          {service.price.toLocaleString('ru-RU')} ₽
        </p>
        <p className="service-card-description">{service.description}</p>
        <button className="service-card-button">Подробнее</button>
      </div>
    </div>
  );
};

export default ServiceCard;

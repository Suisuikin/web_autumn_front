import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Service } from '../types';
import { getImageUrl } from '../services/api';
import '../styles/ServiceCard.css';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="service-card h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={getImageUrl(service.image_url)}
        alt={service.name}
        className="service-card-image"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{service.name}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">
          {service.description.length > 100
            ? `${service.description.substring(0, 100)}...`
            : service.description}
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="h5 mb-0 text-primary">
              {service.price.toLocaleString('ru-RU')} ₽
            </span>
          </div>
          <Button
            as={Link}
            to={`/services/${service.id}`}
            variant="primary"
            className="w-100"
          >
            Подробнее
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;

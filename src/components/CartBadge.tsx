import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Order } from '../types';

interface CartBadgeProps {
  order: Order | null;
}

const CartBadge: React.FC<CartBadgeProps> = ({ order }) => {
  const itemsCount = order?.services.reduce((sum, s) => sum + s.quantity, 0) || 0;
  const totalPrice = order?.services.reduce(
    (sum, s) => sum + (s.service.price * s.quantity),
    0
  ) || 0;

  if (!order || itemsCount === 0) {
    return (
      <Card className="mb-4 text-center" bg="light">
        <Card.Body>
          <Card.Text className="text-muted">
            Корзина пуста
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card
      as={Link}
      to={`/orders/${order.id}`}
      className="mb-4 cart-badge text-decoration-none"
      style={{ cursor: 'pointer' }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">
              🛒 Текущая заявка
              <Badge bg="primary" className="ms-2">{itemsCount}</Badge>
            </h5>
            <p className="mb-0 text-muted">
              Итого: {totalPrice.toLocaleString('ru-RU')} ₽
            </p>
          </div>
          <div>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartBadge;

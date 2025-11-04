import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/styles.css';

interface ResearchRequest {
  id: number;
  status: string;
  created_at: string;
  formed_at?: string;
  completed_at?: string;
  text_for_analysis?: string;
  result_from_year?: number;
  result_to_year?: number;
  matched_layers?: number;
}

const RequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ResearchRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await api.getRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка...</div>;
  }

  return (
    <div className="container">
      <h1>Мои заявки</h1>

      {requests.length > 0 ? (
        <div style={{ display: 'grid', gap: '20px' }}>
          {requests.map((req) => (
            <div
              key={req.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fff',
              }}
            >
              <h3>Заявка #{req.id}</h3>
              <p>
                <strong>Статус:</strong> {req.status}
              </p>
              <p>
                <strong>Создана:</strong>{' '}
                {new Date(req.created_at).toLocaleDateString('ru-RU')}
              </p>
              {req.result_from_year && req.result_to_year && (
                <p>
                  <strong>Период:</strong> {req.result_from_year} —{' '}
                  {req.result_to_year} гг.
                </p>
              )}
              {req.matched_layers && (
                <p>
                  <strong>Совпадений:</strong> {req.matched_layers}
                </p>
              )}
              <button
                onClick={() => navigate(`/requests/${req.id}`)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#F0EDE3',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Подробнее
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Нет заявок</p>
      )}

      <Link to="/" style={{ marginTop: '20px', display: 'block' }}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default RequestsPage;

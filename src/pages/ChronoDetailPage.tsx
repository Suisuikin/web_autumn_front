// src/pages/ChronoDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/styles.css';

interface ChronoDetail {
  id: number;
  name: string;
  description: string;
  fromYear: number;
  toYear: number;
  image?: string;
  corpus?: string;
  frequencies?: string[];
}

const ChronoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chrono, setchrono] = useState<ChronoDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, [id]);

  const loadDetails = async () => {
    try {
      if (!id) return;
      const response = await fetch(`/api/layers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setchrono(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки деталей:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка...</div>;
  }

  if (!chrono) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Слой не найден</p>
        <Link to="/" className="back-button">
          Назад
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="author-detail">
        <h2>{chrono.name}</h2>

        <div className="author-detail-content">
          <div className="author-detail-info">
            <p className="detail-text">{chrono.description}</p>

            <div className="frequency-data">
              <div className="frequency-title">Период:</div>
              <p>
                {chrono.fromYear} — {chrono.toYear} гг.
              </p>
            </div>

            {chrono.corpus && (
              <div className="frequency-data">
                <div className="frequency-title">Корпус:</div>
                <p>{chrono.corpus}</p>
              </div>
            )}

            {chrono.frequencies && chrono.frequencies.length > 0 && (
              <div className="frequency-data">
                <div className="frequency-title">Частотность:</div>
                <ul className="frequency-list">
                  {chrono.frequencies.map((freq, idx) => (
                    <li key={idx}>{freq}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {chrono.image && (
            <div className="author-detail-image">
              <img src={chrono.image} alt={chrono.name} />
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/order', { state: { chronoId: chrono.id } })}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#F0EDE3',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Добавить в заявку
        </button>

        <Link to="/" className="back-button">
          Назад
        </Link>
      </div>
    </div>
  );
};

export default ChronoDetailPage;

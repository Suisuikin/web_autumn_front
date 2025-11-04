import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Layer {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
}

const LayerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [layer, setLayer] = useState<Layer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLayer();
  }, [id]);

  const loadLayer = async () => {
    try {
      if (!id) return;
      const response = await fetch(`/api/layers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setLayer(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToRequest = async () => {
    try {
      if (!id) return;
      const response = await fetch(`/api/layers/${id}/add-to-request`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('Добавлено в заявку!');
        window.location.href = '/order';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div className="container"><p>Загрузка...</p></div>;
  if (!layer) return <div className="container"><p>Слой не найден</p></div>;

  return (
    <div className="container">
      <header>
        <a href="/">
          <h1>Chronology Service</h1>
        </a>
      </header>

      <main>
        <div className="author-detail">
          <h2>{layer.name}</h2>

          {/* ПРАВИЛЬНЫЙ LAYOUT С КАРТИНКОЙ */}
          <div className="author-detail-content">
            <div className="author-detail-info">
              {layer.description && (
                <p className="detail-text">{layer.description}</p>
              )}
            </div>
            {/* КАРТИНКА СПРАВА */}
            {layer.image_url && (
              <div className="author-detail-image">
                <img
                  src={layer.image_url}
                  alt={layer.name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            )}
          </div>

          <button
            onClick={handleAddToRequest}
            className="back-button"
            style={{
              backgroundColor: '#F0EDE3',
              color: '#675E45',
              cursor: 'pointer',
              marginTop: '20px',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            Добавить в заявку
          </button>

          <Link to="/" className="back-button" style={{ marginLeft: '10px' }}>
            Назад
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LayerDetailPage;

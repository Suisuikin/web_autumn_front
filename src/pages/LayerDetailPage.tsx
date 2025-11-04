import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Layer {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  words?: string;
  from_year?: number;
  to_year?: number;
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

  // Парсим слова из строки в массив
  const wordsList = layer?.words
    ? layer.words.split(/[\s,;]+/).filter(w => w.length > 0)
    : [];

  if (loading) {
    return (
      <div className="container">
        <header className="shadow-element" style={{
          height: '160px',
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'center',
          borderRadius: '0 0 10px 10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{ fontSize: '42px', color: '#33290A', fontWeight: 'bold', margin: 0 }}>
              Chrono Archives
            </h1>
          </a>
        </header>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!layer) {
    return (
      <div className="container">
        <header className="shadow-element" style={{
          height: '160px',
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'center',
          borderRadius: '0 0 10px 10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{ fontSize: '42px', color: '#33290A', fontWeight: 'bold', margin: 0 }}>
              Chrono Archives
            </h1>
          </a>
        </header>
        <p>Слой не найден</p>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="shadow-element" style={{
        height: '160px',
        backgroundColor: 'white',
        padding: '20px',
        marginBottom: '30px',
        textAlign: 'center',
        borderRadius: '0 0 10px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{ fontSize: '42px', color: '#33290A', fontWeight: 'bold', margin: 0 }}>
            Chrono Archives
          </h1>
        </a>
      </header>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* БЛОК 1: ЗАГОЛОВОК И ОПИСАНИЕ */}
        <div className="shadow-element" style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          marginBottom: '30px',
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#33290A',
            marginBottom: '10px',
            margin: '0 0 10px 0',
          }}>
            {layer.name}
          </h2>

          {layer.from_year && layer.to_year && (
            <p style={{
              fontSize: '18px',
              color: '#B39223',
              fontWeight: '600',
              marginBottom: '20px',
              margin: '0 0 20px 0',
            }}>
              {layer.from_year} — {layer.to_year} гг.
            </p>
          )}

          {layer.description && (
            <div style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#675E45',
            }}>
              {layer.description}
            </div>
          )}

          {layer.image_url && (
            <img
              src={layer.image_url}
              alt={layer.name}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: '10px',
                marginTop: '20px',
              }}
            />
          )}
        </div>

        {/* БЛОК 2: СПИСОК СЛОВ */}
        {wordsList.length > 0 && (
          <div className="shadow-element" style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            marginBottom: '30px',
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#33290A',
              marginBottom: '20px',
              margin: '0 0 20px 0',
            }}>
              Ключевые слова и термины
            </h3>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              {wordsList.map((word, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: '#F0EDE3',
                    color: '#33290A',
                    padding: '10px 16px',
                    borderRadius: '20px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: '1px solid #D4CFC0',
                    boxShadow: '0 2px 8px rgba(51, 41, 10, 0.08)',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E7E3D5';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F0EDE3';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* КНОПКИ */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '40px',
        }}>
          <button
            onClick={handleAddToRequest}
            style={{
              flex: 1,
              padding: '16px 32px',
              backgroundColor: '#B39223',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 20px 8px rgba(204, 200, 184, 0.5)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#A08219';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#B39223';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Добавить в заявку
          </button>

          <Link
            to="/"
            style={{
              flex: 1,
              padding: '16px 32px',
              backgroundColor: '#F0EDE3',
              color: '#33290A',
              border: '1px solid #D4CFC0',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(51, 41, 10, 0.08)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E7E3D5';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F0EDE3';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Назад
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LayerDetailPage;

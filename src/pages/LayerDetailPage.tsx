import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

interface Layer {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  imageurl?: string;
  words?: string;
  from_year?: number;
  to_year?: number;
  fromyear?: number;
  toyear?: number;
}

const LayerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [layer, setLayer] = useState<Layer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLayer = async () => {
      try {
        if (!id) return;
        const data = await api.getLayerById(parseInt(id, 10));
        setLayer(data as Layer);
      } catch (error) {
        console.error('Error loading layer:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLayer();
  }, [id]);

  // Стили для шапки (Header) - дублируем, чтобы выглядело одинаково
  const navButtonStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#33290A',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '10px 20px',
    borderRadius: '25px',
    border: '2px solid #33290A',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  };

  const renderHeader = () => (
    <header
      className="shadow-element"
      style={{
        height: '120px',
        backgroundColor: 'white',
        padding: '0 40px',
        marginBottom: '30px',
        borderRadius: '0 0 10px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ fontSize: '32px', color: '#33290A', fontWeight: 'bold', margin: 0 }}>
          Chrono Archives
        </h1>
      </Link>

      <nav style={{ display: 'flex', gap: '15px' }}>
        <Link
          to="/landing"
          style={{
            ...navButtonStyle,
            border: 'none',
            fontSize: '18px'
          }}
        >
          Главная
        </Link>
        <Link to="/chrono" style={navButtonStyle}>
          Летопись
        </Link>
      </nav>
    </header>
  );

  const wordsList = layer?.words?.split(',').map((w) => w.trim()).filter((w) => w.length > 0) ?? [];

  const getYears = () => {
      const from = layer?.from_year ?? layer?.fromyear ?? undefined;
      const to = layer?.to_year ?? layer?.toyear ?? undefined;
      if (from && to) return `${from} – ${to}`;
      if (from) return `c ${from}`;
      if (to) return `до ${to}`;
      return '';
  };

  const renderImage = () => {
    const rawUrl = layer?.image_url || layer?.imageurl;
    if (!rawUrl) return null;
    const src = api.getImageUrl(rawUrl);
    return (
      <img
        src={src}
        alt={layer?.name}
        style={{
          width: '100%',
          maxHeight: '400px',
          objectFit: 'cover',
          borderRadius: '10px',
          marginTop: '20px',
        }}
      />
    );
  };

  if (loading) {
    return (
      <div className="container">
        {renderHeader()}
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#675E45' }}>Загрузка...</p>
      </div>
    );
  }

  if (!layer) {
    return (
      <div className="container">
        {renderHeader()}
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#675E45' }}>Слой не найден.</p>
      </div>
    );
  }

  return (
    <div className="container">
      {renderHeader()}

      <div style={{ maxWidth: '1000px', margin: '0 auto 40px' }}>
        <div
          className="shadow-element"
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            marginBottom: '30px',
          }}
        >
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#33290A',
              marginBottom: '10px',
              margin: '0 0 10px 0',
            }}
          >
            {layer.name}
          </h2>

          {getYears() && (
            <p
              style={{
                fontSize: '18px',
                color: '#B39223',
                fontWeight: 600,
                marginBottom: '20px',
                margin: '0 0 20px 0',
              }}
            >
              {getYears()}
            </p>
          )}

          {layer.description && (
            <div
              style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: '#675E45',
              }}
            >
              {layer.description}
            </div>
          )}

          {renderImage()}
        </div>

        {wordsList.length > 0 && (
          <div
            className="shadow-element"
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '10px',
              marginBottom: '30px',
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#33290A',
                marginBottom: '20px',
                margin: '0 0 20px 0',
              }}
            >
              Ключевые слова
            </h3>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {wordsList.map((word, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: '#F0EDE3',
                    color: '#33290A',
                    padding: '10px 16px',
                    borderRadius: '20px',
                    fontSize: '16px',
                    fontWeight: 600,
                    border: '1px solid #D4CFC0',
                    boxShadow: '0 2px 8px rgba(51, 41, 10, 0.08)',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayerDetailPage;

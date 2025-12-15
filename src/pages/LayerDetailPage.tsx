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

  const navButtonStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#33290A',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '8px 16px',
    borderRadius: '25px',
    border: '2px solid #33290A',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    whiteSpace: 'nowrap',
  };

  const renderHeader = () => (
    <header
      className="shadow-element header-responsive"
      style={{
        backgroundColor: 'white',
        borderRadius: '0 0 10px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 className="logo-text" style={{ color: '#33290A', fontWeight: 'bold', margin: 0 }}>
          Chrono Archives
        </h1>
      </Link>

      <nav style={{ display: 'flex', gap: '10px' }}>
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

  // Обертка с глобальными стилями для медиа-запросов
  const styles = (
      <style>{`
        /* Desktop Defaults */
        .header-responsive { height: 120px; padding: 0 40px; }
        .logo-text { font-size: 32px; }
        .content-card { padding: 30px; }
        .layer-title { font-size: 36px; }

        /* Mobile */
        @media (max-width: 768px) {
            .header-responsive {
                height: auto;
                padding: 20px;
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }
            .logo-text { font-size: 28px; }

            .content-card { padding: 20px; } /* Уменьшаем паддинг карточки */
            .layer-title { font-size: 28px; } /* Уменьшаем заголовок */
        }
      `}</style>
  );

  if (loading) {
    return (
      <div className="container">
        {renderHeader()}
        {styles}
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#675E45' }}>Загрузка...</p>
      </div>
    );
  }

  if (!layer) {
    return (
      <div className="container">
        {renderHeader()}
        {styles}
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#675E45' }}>Слой не найден.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      {renderHeader()}
      {styles}

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div
          className="shadow-element content-card"
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            marginBottom: '30px',
          }}
        >
          <h2
            className="layer-title"
            style={{
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
            className="shadow-element content-card"
            style={{
              backgroundColor: 'white',
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

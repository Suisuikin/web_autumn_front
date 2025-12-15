// src/pages/LayerDetailPage.tsx
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

const isTauri = import.meta.env.VITE_IS_TAURI === 'true';
const homePath = (import.meta.env.PROD && !isTauri) ? '/web_autumn_front/' : '/';

const LayerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [layer, setLayer] = useState<Layer | null>(null);
  const [loading, setLoading] = useState(true);

  const homePath = import.meta.env.PROD ? '/web_autumn_front/' : '/';

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

  const handleAddToRequest = async () => {
    try {
      if (!id) return;
      await api.addLayerToRequest(parseInt(id, 10));
      alert('Слой добавлен в заявку');
      window.location.href = '/order';
    } catch (error) {
      console.error('Error adding to request:', error);
      alert('Не удалось добавить слой в заявку');
    }
  };

  const wordsList =
    layer?.words?.split(',').map((w) => w.trim()).filter((w) => w.length > 0) ?? [];

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
        <header
          className="shadow-element"
          style={{
            height: '160px',
            backgroundColor: 'white',
            padding: '20px',
            marginBottom: '30px',
            textAlign: 'center',
            borderRadius: '0 0 10px 10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a href={homePath} style={{ textDecoration: 'none', color: 'inherit' }}>
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
        <header
          className="shadow-element"
          style={{
            height: '160px',
            backgroundColor: 'white',
            padding: '20px',
            marginBottom: '30px',
            textAlign: 'center',
            borderRadius: '0 0 10px 10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a href={homePath} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{ fontSize: '42px', color: '#33290A', fontWeight: 'bold', margin: 0 }}>
              Chrono Archives
            </h1>
          </a>
        </header>
        <p>Слой не найден.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <header
        className="shadow-element"
        style={{
          height: '160px',
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'center',
          borderRadius: '0 0 10px 10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <a href={homePath} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{ fontSize: '42px', color: '#33290A', fontWeight: 'bold', margin: 0 }}>
            Chrono Archives
          </h1>
        </a>
      </header>

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

// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Layer {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  imageurl?: string;
}

const isTauri = import.meta.env.VITE_IS_TAURI === 'true';
const homePath = (import.meta.env.PROD && !isTauri) ? '/web_autumn_front/' : '/';

const HomePage: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // Вычисляем правильный путь "Домой"
  const homePath = import.meta.env.PROD ? '/web_autumn_front/' : '/';

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await api.getLayers();
        setLayers(Array.isArray(data) ? data : []);

        const cart = await api.getCartIcon();
        setCartCount(cart.count ?? 0);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadInitialData();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const query = searchQuery.trim();
      const data = await api.getLayers(query || undefined);
      setLayers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error searching layers:', error);
    }
  };

  const getImageSrc = (layer: Layer) => {
    const rawUrl = layer.image_url || layer.imageurl;
    if (!rawUrl) return undefined;
    return api.getImageUrl(rawUrl);
  };

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
        {/* ИСПРАВЛЕННАЯ ССЫЛКА */}
        <a href={homePath} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1
            style={{
              fontSize: '42px',
              color: '#33290A',
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            Chrono Archives
          </h1>
        </a>
      </header>

      <div className="search-container">
        <form
          id="search-form"
          className="search-bar shadow-element"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Введите автора, период или ключевые слова"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="search-button shadow-element">
          <button type="submit" form="search-form">
            Найти
          </button>
        </div>

        <div className="cart-button shadow-element">
          <Link to="/chrono" style={{ position: 'relative' }}>
            <span className="cart-icon">🛒</span>
          </Link>
        </div>
      </div>

      <main>
        {layers && layers.length > 0 ? (
          <div className="chrono-container">
            {layers.map((layer) => (
              <div key={layer.id} className="chrono-card-wrapper HOVER">
                <Link
                  to={`/layer/${layer.id}`}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    height: '100%',
                  }}
                >
                  <div className="chrono-card shadow-element">
                    {getImageSrc(layer) && (
                      <img
                        src={getImageSrc(layer)}
                        alt={layer.name}
                        className="chrono-card-image"
                        style={{
                          width: '100%',
                          height: '160px',
                          objectFit: 'cover',
                          display: 'block',
                          margin: 0,
                          padding: 0,
                        }}
                      />
                    )}
                    <div className="chrono-info">
                      <h2
                        style={{
                          fontSize: '20px',
                          color: '#33290A',
                          marginBottom: '12px',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          margin: 0,
                        }}
                      >
                        {layer.name}
                      </h2>
                      {layer.description && (
                        <p
                          style={{
                            fontSize: '14px',
                            color: '#675E45',
                            textAlign: 'center',
                            margin: 0,
                            lineHeight: 1.4,
                          }}
                        >
                          {layer.description}
                        </p>
                      )}
                      <div
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px',
                          color: '#B39223',
                          fontSize: '16px',
                          fontWeight: 600,
                          textAlign: 'center',
                          textDecoration: 'none',
                          marginTop: 'auto',
                        }}
                      >
                        Подробнее
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>По вашему запросу ничего не найдено</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;

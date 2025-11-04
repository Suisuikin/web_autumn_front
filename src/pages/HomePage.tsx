import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Layer {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
}

const HomePage: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const resLayers = await fetch('/api/layers');
      if (resLayers.ok) {
        const data = await resLayers.json();
        setLayers(Array.isArray(data) ? data : []);
      }

      const resCart = await fetch('/api/chrono/cart-icon');
      if (resCart.ok) {
        const cartData = await resCart.json();
        setCartCount(cartData.count || 0);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const query = searchQuery.trim();
      const url = query ? `/api/layers?query=${query}` : '/api/layers';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setLayers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <a href="/">
          <h1>Chrono Service</h1>
        </a>
      </header>

      <div className="search-container">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Найти"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="search-button">
          <button type="submit">Найти</button>
        </div>
        <div className="cart-button">
          <Link to="/order" style={{ position: 'relative' }}>
            {/* ИКОНКА КОРЗИНЫ */}
            <span style={{ fontSize: '28px' }}>🛒</span>
            {/* БЕЙДЖ С КОЛИЧЕСТВОМ */}
            {cartCount > 0 && (
              <span
                className="cart-badge"
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#8B0000',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <main>
        {layers && layers.length > 0 ? (
          <div className="chrono-container">
            {layers.map((layer) => (
              <div key={layer.id} className="chrono-card-wrapper">
                {/* HOVER ЭФФЕКТ НА ВСЕЙ КАРТОЧКЕ */}
                <Link
                  to={`/layer/${layer.id}`}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    height: '100%'
                  }}
                >
                  <div className="chrono-card">
                    {/* КАРТИНКА */}
                    {layer.image_url && (
                      <img
                        src={layer.image_url}
                        alt={layer.name}
                        className="chrono-card-image"
                        style={{
                          width: '100%',
                          height: '160px',
                          objectFit: 'cover',
                          display: 'block',
                          margin: 0,
                          padding: 0
                        }}
                      />
                    )}
                    {/* ИНФОРМАЦИЯ */}
                    <div className="chrono-info">
                      <h2 style={{
                        fontSize: '20px',
                        color: '#33290A',
                        marginBottom: '12px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 0
                      }}>
                        {layer.name}
                      </h2>
                      {layer.description && (
                        <p style={{
                          fontSize: '14px',
                          color: '#675E45',
                          textAlign: 'center',
                          margin: 0,
                          lineHeight: 1.4
                        }}>
                          {layer.description}
                        </p>
                      )}
                      <div style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        color: '#B39223',
                        fontSize: '16px',
                        fontWeight: '600',
                        textAlign: 'center',
                        textDecoration: 'none',
                        marginTop: 'auto'
                      }}>
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
// Redux
import { useAppDispatch, useAppSelector } from '../store/store';
import { setGlobalSearchQuery } from '../store/serviceFilterSlice';

interface Layer {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  imageurl?: string;
}

const HomePage: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  // Локальный стейт поиска удален, теперь берем из Redux
  const [cartCount, setCartCount] = useState(0);

  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.serviceFilter.globalSearchQuery);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Используем значение из Redux для начальной загрузки
        const query = searchQuery.trim();
        const data = await api.getLayers(query || undefined);
        setLayers(Array.isArray(data) ? data : []);

        const cart = await api.getCartIcon();
        setCartCount(cart.count ?? 0);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Общие стили для кнопок навигации
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

  return (
    <div className="container">
      {/* ОБНОВЛЕННАЯ ШАПКА */}
      <header
        className="shadow-element"
        style={{
          height: '120px', // Чуть компактнее, так как контент теперь в ширину
          backgroundColor: 'white',
          padding: '0 40px', // Отступы по бокам
          marginBottom: '30px',
          borderRadius: '0 0 10px 10px',
          display: 'flex',
          justifyContent: 'space-between', // Разносим лого и кнопки по краям
          alignItems: 'center',
        }}
      >
        {/* Логотип / Название */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1
            style={{
              fontSize: '32px', // Чуть меньше для аккуратности
              color: '#33290A',
              fontWeight: 'bold',
              margin: 0,
            }}
          >
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

          <Link
            to="/chrono"
            style={navButtonStyle}
          >
            Летопись {cartCount > 0 && `(${cartCount})`}
          </Link>
        </nav>
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
            onChange={(e) => dispatch(setGlobalSearchQuery(e.target.value))}
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

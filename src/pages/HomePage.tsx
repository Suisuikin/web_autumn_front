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
  const [cartCount, setCartCount] = useState(0);

  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.serviceFilter.globalSearchQuery);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
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

  return (
    <div className="container" style={{ paddingBottom: '40px' }}>
      {/* АДАПТИВНАЯ ШАПКА */}
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
          <h1 className="logo-text" style={{
            color: '#33290A',
            fontWeight: 'bold',
            margin: 0,
          }}>
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

          <Link
            to="/chrono"
            style={navButtonStyle}
          >
            Летопись
          </Link>
        </nav>
      </header>

      {/* ПОИСК */}
      <div className="search-container responsive-search">
        <form
          id="search-form"
          className="search-bar shadow-element"
          onSubmit={handleSearch}
          style={{ flexGrow: 1 }}
        >
          <input
            type="text"
            placeholder="Поиск по автору или периоду..."
            value={searchQuery}
            onChange={(e) => dispatch(setGlobalSearchQuery(e.target.value))}
            style={{ width: '100%', padding: '12px', border: 'none', outline: 'none', fontSize: '16px', borderRadius: '10px' }}
          />
        </form>

        <div className="search-button shadow-element">
          <button type="submit" form="search-form">
            Найти
          </button>
        </div>

        <div className="cart-button shadow-element mobile-hidden">
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
                            // Ограничение строк для описания
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
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

      {/* СТИЛИ АДАПТИВНОСТИ */}
      <style>{`
        /* Дефолтные стили (Desktop) */
        .header-responsive { height: 120px; padding: 0 40px; }
        .logo-text { font-size: 32px; }
        .responsive-search { display: flex; gap: 15px; margin-bottom: 30px; align-items: center; }
        .search-bar { flex-grow: 1; }
        .chrono-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
        }
        .mobile-hidden { display: block; }

        /* Мобильные стили */
        @media (max-width: 768px) {
            .header-responsive {
                height: auto;
                padding: 20px;
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }
            .logo-text { font-size: 28px; }

            .responsive-search {
                flex-direction: column;
                gap: 10px;
                width: 100%;
            }
            .search-bar { width: 100%; }
            .search-button { width: 100%; }
            .search-button button { width: 100%; }

            /* Скрываем старую кнопку корзины, так как она есть в меню */
            .mobile-hidden { display: none; }

            .chrono-container {
                grid-template-columns: 1fr; /* Одна колонка */
                gap: 20px;
            }
        }
      `}</style>
    </div>
  );
};

export default HomePage;

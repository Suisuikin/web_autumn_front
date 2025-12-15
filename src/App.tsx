// src/App.tsx
import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LayerDetailPage from './pages/LayerDetailPage';
import ServiceListPage from './pages/ServiceListPage';

import './styles/styles.css';

const App: FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
    }

    const handleInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  const isGitHubPages = window.location.hostname.includes('github.io');
  const basename = isGitHubPages ? '/web_autumn_front/' : '/';

  return (
    <Provider store={store}>
      <Router basename={basename}>

        {showInstallBtn && (
          <button
            onClick={handleInstallClick}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: 9999,
              padding: '12px 24px',
              backgroundColor: '#B39223',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            📥 Установить приложение
          </button>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/layer/:id" element={<LayerDetailPage />} />
          <Route path="/chrono" element={<HomePage />} />
          <Route path="/services" element={<ServiceListPage />} />
          <Route
            path="*"
            element={
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>404 - Страница не найдена</h1>
                <Link
                  to="/"
                  style={{ color: '#B39223', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  ← Вернуться на главную
                </Link>
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

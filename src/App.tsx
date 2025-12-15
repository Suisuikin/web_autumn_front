import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LayerDetailPage from './pages/LayerDetailPage';
import ServiceListPage from './pages/ServiceListPage';

import './styles/styles.css';

const App: FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.ts')
        .then(() => console.log('Service Worker зарегистрирован'))
        .catch((err) => console.log('Ошибка SW:', err));
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/layers/:id" element={<LayerDetailPage />} />
          <Route path="/chrono" element={<HomePage />} />
          <Route path="/services" element={<ServiceListPage />} />
          <Route
            path="*"
            element={
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>404 - Страница не найдена</h1>
                <a href="/">← Вернуться на главную</a>
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

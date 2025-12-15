import React, { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import ServiceListPage from './pages/ServiceListPage';

const App: FC = () => {
  useEffect(() => {
    // Регистрируем Service Worker для PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.ts')
        .then((reg) => console.log('Service Worker зарегистрирован'))
        .catch((err) => console.log('Ошибка SW:', err));
    }
  }, []);

  return (
    <Provider store={store}>
      <div className="app">
        <ServiceListPage title="Услуги" />
      </div>
    </Provider>
  );
};

export default App;

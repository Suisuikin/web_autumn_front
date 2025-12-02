import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LayerDetailPage from './pages/LayerDetailPage';
import OrderPage from './pages/OrderPage';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<LandingPage />} />

        {}
        <Route path="/app" element={<HomePage />} />
        <Route path="/layer/:id" element={<LayerDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

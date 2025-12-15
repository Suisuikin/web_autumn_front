// src/pages/LandingPage.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const LandingPage: React.FC = () => {
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
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  return (
    <div className="landing-container" style={{ backgroundColor: '#F0EDE3', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* HEADER */}
      <header className="shadow-element header-responsive" style={{
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
      }}>
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
          <Link to="/" style={{ ...navButtonStyle, border: 'none' }}>
            Главная
          </Link>
          <Link to="/chrono" style={navButtonStyle}>
            Летопись
          </Link>
        </nav>
      </header>

      <section className="hero-section" style={{
        textAlign: 'center',
        backgroundColor: '#F0EDE3',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          animation: `fadeIn 0.6s ease-in`,
        }}>
          <h2 className="hero-title" style={{
            fontWeight: '800',
            color: '#33290A',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}>
            Исторический архив текстов
          </h2>
          <p className="hero-subtitle" style={{
            color: '#675E45',
            marginBottom: '30px',
            lineHeight: 1.6,
            fontWeight: '500',
          }}>
            Анализируйте историческую принадлежность текстов через уникальную хронологическую базу данных
          </p>
        </div>
      </section>

      <section className="welcome-section" style={{
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h3 className="section-title" style={{ fontWeight: 'bold', color: '#33290A', marginBottom: '10px' }}>
              Добро пожаловать!
            </h3>
        </div>

        <div className="shadow-element welcome-card" style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px 8px rgba(204, 200, 184, 0.3)',
        }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <h4 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    color: '#33290A'
                }}>
                    Как использовать
                </h4>

                <div className="steps-list" style={{
                    textAlign: 'left',
                    display: 'inline-block',
                    color: '#333',
                    lineHeight: '2.0'
                }}>
                    <div>1. Перейдите в раздел <Link to="/chrono" style={{color: '#B39223', fontWeight: 'bold', textDecoration: 'none'}}>"Летопись"</Link></div>
                    <div>2. Выберите интересующий Вас период</div>
                    <div>3. Изучите детальную информацию</div>
                    <div>4. Создайте заявку на анализ текста</div>
                </div>
            </div>
        </div>
      </section>

      <section className="eras-section" style={{
        maxWidth: '1200px',
        margin: '60px auto 80px',
      }}>
        <h3 className="section-title" style={{
          fontWeight: '800',
          color: '#33290A',
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          Ключевые Эпохи
        </h3>

        <div className="eras-grid">
          <div className="era-card shadow-element">
            <div className="era-icon">🏛️</div>
            <h4 className="era-title">Античность</h4>
            <div className="era-years">VIII в. до н.э. — V в. н.э.</div>
            <p className="era-desc">
              Философские трактаты, поэмы Гомера и римское право. Основы западной цивилизации.
            </p>
          </div>

          <div className="era-card shadow-element">
            <div className="era-icon">🏰</div>
            <h4 className="era-title">Средневековье</h4>
            <div className="era-years">V — XV вв.</div>
            <p className="era-desc">
              Рыцарские романы, церковные летописи и становление европейских государств.
            </p>
          </div>

          <div className="era-card shadow-element">
            <div className="era-icon">⚙️</div>
            <h4 className="era-title">Новое время</h4>
            <div className="era-years">XVII — XIX вв.</div>
            <p className="era-desc">
              Эпоха просвещения, промышленные революции и расцвет классической литературы.
            </p>
          </div>
        </div>
      </section>

      <footer style={{
        backgroundColor: '#33290A',
        color: '#F0EDE3',
        textAlign: 'center',
        padding: '40px 20px',
        fontSize: '16px',
        borderTop: '4px solid #B39223',
      }}>
        <div style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '22px', opacity: 0.9 }}>
          Chrono Archives
        </div>
        <p style={{ margin: 0 }}>© 2025 Все права защищены.</p>
        <p style={{ marginTop: '10px', fontSize: '13px', opacity: 0.6, maxWidth: '500px', margin: '10px auto 0' }}>
          Проект разработан для анализа исторических текстов с использованием современных алгоритмов.
        </p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* --- Desktop Defaults --- */
        .header-responsive { height: 120px; padding: 0 40px; margin-bottom: 0; }
        .logo-text { font-size: 32px; }
        .hero-section { padding: 60px 20px 40px; }
        .hero-title { font-size: 56px; }
        .hero-subtitle { font-size: 24px; }
        .welcome-section { padding: 0 20px 60px; }
        .welcome-card { padding: 40px 60px; }
        .steps-list { font-size: 18px; }
        .section-title { font-size: 42px; }

        .eras-section { padding: 0 40px; }
        .eras-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .era-card {
          background-color: white;
          border-radius: 15px;
          padding: 30px;
          text-align: center;
          transition: transform 0.3s ease;
        }
        .era-card:hover { transform: translateY(-5px); }
        .era-icon { font-size: 48px; margin-bottom: 15px; }
        .era-title { font-size: 22px; font-weight: bold; color: #33290A; margin-bottom: 5px; }
        .era-years { color: #B39223; font-weight: 600; margin-bottom: 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
        .era-desc { font-size: 15px; color: #675E45; line-height: 1.5; }

        /* --- Mobile Adaptivity --- */
        @media (max-width: 768px) {
          .header-responsive {
            height: auto;
            padding: 20px;
            flex-direction: column;
            gap: 15px;
          }
          .logo-text { font-size: 28px; }

          .hero-section { padding: 40px 20px; }
          .hero-title { font-size: 32px; } /* Уменьшаем заголовок */
          .hero-subtitle { font-size: 18px; margin-bottom: 20px; }

          .welcome-card { padding: 30px 20px; } /* Меньше паддинг */
          .steps-list { font-size: 16px; text-align: left; width: 100%; }
          .section-title { font-size: 28px; }

          .eras-section { margin: 40px auto; padding: 0 20px; }
          .eras-grid {
            grid-template-columns: 1fr; /* Одна колонка */
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

// src/pages/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Стили для кнопок навигации
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
    cursor: 'pointer',
  };

  return (
    <div style={{ backgroundColor: '#F0EDE3', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* HEADER */}
      <header className="shadow-element" style={{
        height: '120px',
        backgroundColor: 'white',
        padding: '0 40px',
        marginBottom: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{
            fontSize: '32px',
            color: '#33290A',
            fontWeight: 'bold',
            margin: 0,
          }}>
            Chrono Archives
          </h1>
        </Link>

        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link
            to="/"
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

      {/* HERO SECTION */}
      <section style={{
        textAlign: 'center',
        padding: '60px 20px 40px',
        backgroundColor: '#F0EDE3',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          animation: `fadeIn 0.6s ease-in`,
        }}>
          <h2 style={{
            fontSize: '56px',
            fontWeight: '800',
            color: '#33290A',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}>
            Исторический архив текстов
          </h2>
          <p style={{
            fontSize: '24px',
            color: '#675E45',
            marginBottom: '40px',
            lineHeight: 1.6,
            fontWeight: '500',
          }}>
            Анализируйте историческую принадлежность текстов через уникальную хронологическую базу данных
          </p>
        </div>
      </section>

      {/* WELCOME / HOW TO USE SECTION (БЕЗ СТРЕЛОК) */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto 60px',
        padding: '0 20px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#33290A', marginBottom: '10px' }}>
              Добро пожаловать!
            </h3>
        </div>

        <div className="shadow-element" style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px 60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px 8px rgba(204, 200, 184, 0.3)', // Сделал тень мягче
        }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <h4 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                    color: '#33290A'
                }}>
                    Как использовать
                </h4>

                <div style={{
                    textAlign: 'left',
                    display: 'inline-block',
                    fontSize: '18px',
                    color: '#333',
                    lineHeight: '2.2'
                }}>
                    <div>1. Перейдите в раздел <Link to="/chrono" style={{color: '#B39223', fontWeight: 'bold', textDecoration: 'none'}}>"Летопись"</Link></div>
                    <div>2. Выберите интересующий Вас исторический период</div>
                    <div>3. Изучите детальную информацию и документы</div>
                    <div>4. Создайте заявку на хронологический анализ текста</div>
                </div>
            </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        backgroundColor: 'white',
        padding: '80px 40px',
        margin: '40px auto 80px', // Увеличил отступ снизу перед футером
        borderRadius: '10px',
        maxWidth: '1200px',
        boxShadow: '0 8px 20px 8px rgba(204, 200, 184, 0.5)',
      }}>
        <h3 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: '#33290A',
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          Возможности системы
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
        }}>
          {/* FEATURE 1 */}
          <div style={{
            padding: '30px',
            backgroundColor: '#F0EDE3',
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📚</div>
            <h4 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#33290A',
              marginBottom: '15px',
            }}>
              Большая база
            </h4>
            <p style={{
              fontSize: '16px',
              color: '#675E45',
              lineHeight: 1.6,
            }}>
              Доступ к тысячам исторических текстов, отсортированных по хронологическим периодам
            </p>
          </div>

          {/* FEATURE 2 */}
          <div style={{
            padding: '30px',
            backgroundColor: '#F0EDE3',
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            <h4 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#33290A',
              marginBottom: '15px',
            }}>
              Анализ текстов
            </h4>
            <p style={{
              fontSize: '16px',
              color: '#675E45',
              lineHeight: 1.6,
            }}>
              Быстрый и точный анализ текста для определения исторической принадлежности
            </p>
          </div>

          {/* FEATURE 3 */}
          <div style={{
            padding: '30px',
            backgroundColor: '#F0EDE3',
            borderRadius: '10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
            <h4 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#33290A',
              marginBottom: '15px',
            }}>
              Отчеты
            </h4>
            <p style={{
              fontSize: '16px',
              color: '#675E45',
              lineHeight: 1.6,
            }}>
              Подробные отчеты с визуализацией результатов анализа
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER (ОБНОВЛЕННЫЙ) */}
      <footer style={{
        backgroundColor: '#33290A',
        color: '#F0EDE3',
        textAlign: 'center',
        padding: '50px 20px',
        fontSize: '16px',
        borderTop: '4px solid #B39223', // Добавил золотую линию сверху для стиля
      }}>
        <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '24px', opacity: 0.9 }}>
          Chrono Archives
        </div>
        <p>© 2025 Все права защищены.</p>
        <p style={{ marginTop: '10px', fontSize: '14px', opacity: 0.6, maxWidth: '600px', margin: '10px auto 0' }}>
          Проект разработан для анализа исторических текстов с использованием современных алгоритмов обработки естественного языка и обширной хронологической базы данных.
        </p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

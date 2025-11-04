import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#F0EDE3', minHeight: '100vh' }}>
      {/* HEADER */}
      <header className="shadow-element" style={{
        height: '160px',
        backgroundColor: 'white',
        padding: '20px',
        marginBottom: '0',
        textAlign: 'center',
        borderRadius: '0 0 10px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{
            fontSize: '42px',
            color: '#33290A',
            fontWeight: 'bold',
            margin: 0,
          }}>
            Chrono Archives
          </h1>
        </a>
      </header>

      {/* HERO SECTION */}
      <section style={{
        textAlign: 'center',
        padding: '80px 40px',
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
          <Link to="/app" style={{
            display: 'inline-block',
            padding: '18px 48px',
            backgroundColor: '#B39223',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            borderRadius: '10px',
            textDecoration: 'none',
            boxShadow: '0 8px 20px 8px rgba(204, 200, 184, 0.5)',
            transition: 'all 0.3s ease',
            border: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#A08219';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#B39223';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Начать анализ
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        backgroundColor: 'white',
        padding: '80px 40px',
        margin: '40px auto',
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
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 25px 10px rgba(204, 200, 184, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
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
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 25px 10px rgba(204, 200, 184, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
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
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 25px 10px rgba(204, 200, 184, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
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

      {/* HOW IT WORKS */}
      <section style={{
        backgroundColor: '#F0EDE3',
        padding: '80px 40px',
      }}>
        <h3 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: '#33290A',
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          Как это работает
        </h3>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '60px',
        }}>
          {/* STEP 1 */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#B39223',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              margin: '0 auto 20px',
              boxShadow: '0 8px 20px 8px rgba(204, 200, 184, 0.5)',
            }}>
              1
            </div>
            <h4 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#33290A',
              marginBottom: '10px',
            }}>
              Загрузить текст
            </h4>
            <p style={{
              fontSize: '16px',
              color: '#675E45',
              lineHeight: 1.6,
            }}>
              Введите или загрузите текст для анализа
            </p>
          </div>

          <div style={{ fontSize: '36px', color: '#B39223', marginBottom: '30px' }}>→</div>

          {/* STEP 2 */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#B39223',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              margin: '0 auto 20px',
              boxShadow: '0 8px 20px 8px rgba(204, 200, 184, 0.5)',
            }}>
              2
            </div>
            <h4 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#33290A',
              marginBottom: '10px',
            }}>
              Анализировать
            </h4>
            <p style={{
              fontSize: '16px',
              color: '#675E45',
              lineHeight: 1.6,
            }}>
              Система анализирует историческую принадлежность
            </p>
          </div>

          <div style={{ fontSize: '36px', color: '#B39223', marginBottom: '30px' }}>→</div>

          {/* STEP 3 */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#B39223',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              margin: '0 auto 20px',
              boxShadow: '0 8px 20px 8px rgba(204, 200, 184, 0.5)',
            }}>
              3
            </div>
            <h4 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#33290A',
              marginBottom: '10px',
            }}>
              Получить отчет
            </h4>
            <p style={{
              fontSize: '16px',
              color: '#675E45',
              lineHeight: 1.6,
            }}>
              Скачайте подробный отчет результатов
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        backgroundColor: 'white',
        padding: '80px 40px',
        margin: '40px auto',
        borderRadius: '10px',
        maxWidth: '1200px',
        textAlign: 'center',
        boxShadow: '0 8px 20px 8px rgba(204, 200, 184, 0.5)',
      }}>
        <h3 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: '#33290A',
          marginBottom: '20px',
        }}>
          Готовы начать?
        </h3>
        <p style={{
          fontSize: '20px',
          color: '#675E45',
          marginBottom: '40px',
          lineHeight: 1.6,
        }}>
          Присоединитесь к исследователям, которые используют Chrono Archives для анализа исторических текстов
        </p>
        <Link to="/app" style={{
          display: 'inline-block',
          padding: '18px 48px',
          backgroundColor: '#B39223',
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          borderRadius: '10px',
          textDecoration: 'none',
          boxShadow: '0 8px 20px 8px rgba(204, 200, 184, 0.5)',
          transition: 'all 0.3s ease',
          border: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#A08219';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#B39223';
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          Начать сейчас
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: '#33290A',
        color: '#F0EDE3',
        textAlign: 'center',
        padding: '40px',
        fontSize: '16px',
      }}>
        <p>© 2025 Chrono Archives. Все права защищены.</p>
        <p style={{ marginTop: '10px', fontSize: '14px', opacity: 0.8 }}>
          Исторический анализ текстов через хронологическую классификацию
        </p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

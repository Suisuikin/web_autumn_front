import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

interface RandomLayer {
  id: number;
  name: string;
  from_year: number;
  to_year: number;
  image_url: string;
}

interface RequestData {
  request_id?: number;
  status?: string;
  notes?: string;
  random_layers?: RandomLayer[];
  comments?: Record<number, string>;
}

const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<RequestData | null>(null);
  const [notes, setNotes] = useState('');
  const [comments, setComments] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequest();
  }, [id]);

  const loadRequest = async () => {
    try {
      if (id) {
        const res = await fetch(`/api/chrono/${id}`);
        if (res.ok) {
          const data = await res.json();
          setRequest(data);
          setNotes(data.notes || '');
          setComments(data.comments || {});
        }
      } else {
        setRequest({});
      }
    } catch {
      setRequest({});
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request?.request_id) return;

    try {
      await fetch(`/api/chrono/${request.request_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes, comments }),
      });
      alert('Сохранено');
    } catch {}
  };

  const handleClose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request?.request_id) return;

    try {
      const res = await fetch(`/api/chrono/${request.request_id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Заявка закрыта');
        window.location.href = '/';
      }
    } catch {}
  };

  if (loading) {
    return (
      <div className="container">
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="shadow-element">
        <Link to="/">
          <h1>Chrono Archives</h1>
        </Link>
      </header>

      <div className="order-form-new shadow-element">
        <div className="order-form-layout">
          <div className="order-form-left">
            <form onSubmit={handleSave}>

              {/* {{if .RequestID}} */}
              {request?.request_id && (
                <div className="request-info-wrapper" style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <div className="request-id shadow-element" style={{ padding: '8px 12px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                    <strong>ID заявки:</strong> {request.request_id}
                  </div>
                  <div className="request-status shadow-element" style={{ padding: '8px 12px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                    <strong>Статус:</strong> {request.status}
                  </div>
                </div>
              )}
              {/* {{end}} */}

              {/* Введите слова + Результат */}
              <div className="order-section row-layout" style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>
                {/* Левая колонка - ввод */}
                <div className="input-column shadow-element" style={{ flex: 2, padding: '12px', borderRadius: '8px', backgroundColor: '#fff' }}>
                  <h2 className="input-label">Введите слова</h2>
                  <input
                    type="text"
                    name="notes"
                    className="notes-input"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{
                      width: '100%',
                      height: '120px',
                      padding: '8px',
                      boxSizing: 'border-box',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      fontFamily: 'inherit',
                      fontSize: '16px',
                    }}
                  />
                </div>

                {/* Правая колонка - результат */}
                <div className="result-column shadow-element" style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <h2 className="input-label">Результат хронологической принадлежности</h2>
                  <div className="chrono-result-wrapper" style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '6px', width: '100%', textAlign: 'center' }}>
                    <span className="chrono-years">1234 — 2000 гг.</span>
                  </div>
                </div>
              </div>

              {/* {{if .RandomLayers}} */}
              {request?.random_layers && request.random_layers.length > 0 && (
                <>
                  <div className="dotted-separator"></div>

                  {/* {{range .RandomLayers}} */}
                  {request.random_layers.map((layer) => (
                    <div key={layer.id} className="service-comment-wrapper" style={{ display: 'flex', gap: '12px', alignItems: 'stretch', marginBottom: '16px' }}>
                      {/* Карточка слоя с картинкой */}
                      <div className="order-service-card shadow-element" style={{ flex: 1 }}>
                        <img src={layer.image_url} alt={layer.name} />
                        <div className="order-service-card-info">
                          <h3>{layer.name}</h3>
                          <span className="chrono-years">{layer.from_year} — {layer.to_year} гг.</span>
                        </div>
                      </div>

                      {/* Поле комментария */}
                      <div className="comment-field-wrapper" style={{ flex: 1 }}>
                        <input
                          type="text"
                          name={`comment_${layer.id}`}
                          className="input-field shadow-element"
                          placeholder="Комментарий"
                          value={comments[layer.id] || ''}
                          onChange={(e) => setComments({ ...comments, [layer.id]: e.target.value })}
                          style={{
                            width: '100%',
                            height: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {/* {{end}} */}
                </>
              )}
              {/* {{end}} */}

              <div className="dotted-separator"></div>

              {/* Кнопки */}
              <div className="order-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', gap: '12px' }}>
                <button
                  type="submit"
                  className="action-button shadow-element"
                  style={{
                    flex: 1,
                    width: '100%',
                    padding: '14px 0',
                    fontSize: '18px',
                    backgroundColor: '#5bc0de',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Сохранить параметры
                </button>

                <button
                  type="submit"
                  onClick={handleClose}
                  className="action-button shadow-element"
                  style={{
                    flex: 1,
                    width: '100%',
                    padding: '14px 0',
                    fontSize: '18px',
                    backgroundColor: '#d9534f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Закрыть заявку
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

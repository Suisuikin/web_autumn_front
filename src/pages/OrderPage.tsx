// src/pages/OrderPage.tsx

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MOCK_LAYERS } from '../services/mockLayers';

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

// Хелпер для выбора двух случайных элементов
function pickTwoRandom<T>(arr: T[]): T[] {
  if (!arr || arr.length <= 2) return (arr || []).slice(0, 2);
  const idxs = new Set<number>();
  while (idxs.size < 2) idxs.add(Math.floor(Math.random() * arr.length));
  return Array.from(idxs).map(i => arr[i]);
}

const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<RequestData | null>(null);
  const [notes, setNotes] = useState('');
  const [comments, setComments] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Всегда используем MOCK-данные
    const twoRandomLayers = pickTwoRandom(MOCK_LAYERS);
    setRequest({
      request_id: id ? parseInt(id) : undefined,
      status: 'draft',
      notes: '',
      random_layers: twoRandomLayers,
      comments: {},
    });
    setNotes('');
    setComments({});
    setLoading(false);
  }, [id]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[MOCK] Сохранение:', { notes, comments });
    alert('Mock-режим: Заметки сохранены\n\n' + JSON.stringify({ notes, comments }, null, 2));
  };

  const handleClose = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[MOCK] Закрытие заявки');
    alert('Mock-режим: Заявка закрыта');
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

              <div className="order-section row-layout" style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>
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

                <div className="result-column shadow-element" style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <h2 className="input-label">Результат хронологической принадлежности</h2>
                  <div className="chrono-result-wrapper" style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '6px', width: '100%', textAlign: 'center' }}>
                    <span className="chrono-years">1234 — 2000 гг.</span>
                  </div>
                </div>
              </div>

              {request?.random_layers && request.random_layers.length > 0 && (
                <>
                  <div className="dotted-separator"></div>

                  <div className="order-random-services" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {request.random_layers.slice(0, 2).map((layer) => (
                      <div key={layer.id} className="service-comment-wrapper" style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
                        <div className="order-service-card shadow-element" style={{ flex: 1 }}>
                          <img src={layer.image_url} alt={layer.name} />
                          <div className="order-service-card-info">
                            <h3>{layer.name}</h3>
                            <span className="chrono-years">{layer.from_year} — {layer.to_year} гг.</span>
                          </div>
                        </div>
                        <div className="comment-field-wrapper" style={{ flex: 1 }}>
                          <div className="input-wrapper" style={{ height: '100%' }}>
                            <div
                              className="input-field shadow-element"
                              contentEditable
                              data-placeholder="Комментарий"
                              style={{ height: '100%' }}
                              suppressContentEditableWarning
                              onInput={(e) => {
                                const text = (e.currentTarget as HTMLDivElement).textContent || '';
                                setComments(prev => ({ ...prev, [layer.id]: text }));
                              }}
                            >
                              {comments?.[layer.id] ?? ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="dotted-separator"></div>

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
                  type="button"
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

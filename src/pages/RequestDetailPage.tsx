import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/styles.css';

interface ResearchRequest {
  id: number;
  status: string;
  text_for_analysis?: string;
  purpose?: string;
  result_from_year?: number;
  result_to_year?: number;
  matched_layers?: number;
  layers?: any[];
}

const RequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<ResearchRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [textForAnalysis, setTextForAnalysis] = useState('');

  useEffect(() => {
    loadRequest();
  }, [id]);

  const loadRequest = async () => {
    try {
      if (!id) return;
      const data = await api.getRequestById(parseInt(id));
      setRequest(data);
      setTextForAnalysis(data.text_for_analysis || '');
    } catch (error) {
      console.error('Error loading request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequest = async () => {
    try {
      if (!id) return;
      await api.updateRequest(parseInt(id), {
        text_for_analysis: textForAnalysis,
      });
      alert('Заявка обновлена!');
      loadRequest();
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Ошибка при обновлении заявки');
    }
  };

  const handleFormRequest = async () => {
    try {
      if (!id) return;
      await api.formRequest(parseInt(id));
      alert('Заявка сформирована!');
      loadRequest();
    } catch (error) {
      console.error('Error forming request:', error);
      alert('Ошибка при формировании заявки');
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка...</div>;
  }

  if (!request) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Заявка не найдена</p>
        <Link to="/requests">Вернуться к заявкам</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Заявка #{request.id}</h1>

      <div style={{ marginBottom: '20px' }}>
        <p>
          <strong>Статус:</strong> {request.status}
        </p>
      </div>

      {request.status === 'draft' && (
        <div style={{ marginBottom: '20px' }}>
          <label>
            <strong>Текст для анализа:</strong>
          </label>
          <textarea
            value={textForAnalysis}
            onChange={(e) => setTextForAnalysis(e.target.value)}
            rows={5}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontFamily: 'monospace',
            }}
          />
          <button
            onClick={handleUpdateRequest}
            style={{
              padding: '10px 20px',
              backgroundColor: '#F0EDE3',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
              marginRight: '10px',
            }}
          >
            Сохранить
          </button>
          <button
            onClick={handleFormRequest}
            style={{
              padding: '10px 20px',
              backgroundColor: '#B39223',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Сформировать заявку
          </button>
        </div>
      )}

      {request.result_from_year && request.result_to_year && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Результаты анализа:</h3>
          <p>
            <strong>Период:</strong> {request.result_from_year} —{' '}
            {request.result_to_year} гг.
          </p>
          <p>
            <strong>Совпадений слоев:</strong> {request.matched_layers}
          </p>
        </div>
      )}

      {request.layers && request.layers.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Слои в заявке:</h3>
          {request.layers.map((layer) => (
            <div
              key={layer.id}
              style={{
                border: '1px solid #eee',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
            >
              <p>
                <strong>{layer.name}</strong>
              </p>
              <p>
                {layer.from_year} — {layer.to_year} гг.
              </p>
            </div>
          ))}
        </div>
      )}

      <Link to="/requests">Вернуться к заявкам</Link>
    </div>
  );
};

export default RequestDetailPage;

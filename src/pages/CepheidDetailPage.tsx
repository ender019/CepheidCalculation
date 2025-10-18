import { FC, useState, useEffect } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Cepheid } from '../types';
import { cepheidService } from '../services/api';
import { ROUTES } from '../Routes';
import Breadcrumbs from '../components/Breadcrumbs';
import { useImageWithFallback } from '../hooks/useImageWithFallback';

const CepheidDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cepheid, setCepheid] = useState<Cepheid | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const image = useImageWithFallback(cepheid?.img || '');

  useEffect(() => {
    if (id) {
      loadCepheid(id);
    } else {
      setError('ID цефеиды не указан');
      setLoading(false);
    }
  }, [id]);

  const loadCepheid = async (cepheidId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await cepheidService.getCepheidById(cepheidId);
      setCepheid(data);
    } catch (error) {
      console.error('Ошибка загрузки цефеиды:', error);
      setError('Не удалось загрузить данные цефеиды');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <Alert variant="info">Загрузка...</Alert>
      </Container>
    );
  }

  if (error || !cepheid) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          {error || 'Цефеида не найдена'}
        </Alert>
        <Link to={ROUTES.CEPHEIDS} className="back-link">
          Вернуться к каталогу
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Breadcrumbs crumbs={[
        { label: cepheid.title }
      ]} />

      <Link to={ROUTES.CEPHEIDS} className="back-link">← Назад к каталогу</Link>

      <Card className="cepheid-detail">
        <Card.Img 
          variant="top" 
          src={image.src} 
          className="cepheid-image-detail"
          onError={image.onError}
          onLoad={image.onLoad}
          alt={cepheid.title}
        />
        <Card.Body className="cepheid-content-detail">
          <Card.Title className="cepheid-title-detail">{cepheid.title}</Card.Title>

          <div className="cepheid-meta">
            <div className="meta-item">
              <div className="meta-title">Период:</div>
              <div className="meta-content">{cepheid.period}</div>
            </div>
            <div className="meta-item">
              <div className="meta-title">Источник данных:</div>
              <div className="meta-content">{cepheid.source}</div>
            </div>
          </div>

          <Card.Text className="cepheid-description-detail">
            {cepheid.description}
          </Card.Text>

          <div className="cepheid-coeffs">
            Примерные коэффициенты: a = -2.81, b = -1.43
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CepheidDetailPage;
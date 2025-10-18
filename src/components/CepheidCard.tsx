// src/components/CepheidCard.tsx
import type { FC } from 'react';
import { Card } from 'react-bootstrap';
import type { Cepheid } from '../types/index';
import { useImageWithFallback } from '../hooks/useImageWithFallback';

interface CepheidCardProps {
  cepheid: Cepheid;
  onDetailsClick: (id: string) => void; // меняем тип на string
}

const CepheidCard: FC<CepheidCardProps> = ({
  cepheid,
  onDetailsClick
}) => {
  const { id, title, img, period, source } = cepheid;
  const image = useImageWithFallback(img);

  return (
    <Card className="cepheid-card h-100">
      <Card.Img 
        variant="top" 
        src={image.src} 
        className="cepheid-image"
        onError={image.onError}
        onLoad={image.onLoad}
      />
      <Card.Body className="cepheid-content">
        <h3 className="cepheid-title">{title}</h3>
        
        <div className="cepheid-params">
          <b>Период:</b> <span>{period} дней</span> {/* период теперь number */}
          <b>Источник:</b> <span>{source}</span>
        </div>
        
        <div className="card-actions">
          <button 
            className="action-btn details-btn"
            onClick={() => onDetailsClick(id)} // id теперь string
          >
            Подробнее
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CepheidCard;
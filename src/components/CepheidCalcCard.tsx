import type { FC } from 'react';
import { Card } from 'react-bootstrap';
import type { Cepheid } from '../types';
import { useImageWithFallback } from '../hooks/useImageWithFallback';

interface CepheidCalcCardProps {
  item: Cepheid;
}

const CepheidCalcCard: FC<CepheidCalcCardProps> = ({ item }) => {
  const image = useImageWithFallback(item.img, '/img/default.jpg');

  return (
    <Card className="cepheid-item">
      <Card.Body>
        <div className="d-flex">
          <div className="me-3">
            <Card.Img 
              src={image.src} 
              className="item-image"
              onError={image.onError}
              onLoad={image.onLoad}
            />
          </div>
          <div className="flex-grow-1">
            <Card.Title className="item-title">{item.title}</Card.Title>
            <div className="item-grid">
              <div>
                <div className="item-attribute-title">Период</div>
                <div className="item-value">
                  <span>{item.period} дн.</span>
                </div>
              </div>
              
              <div>
                <div className="item-attribute-title">Видимая звездная величина</div>
                <div className="item-value">
                  <input
                    type="text"
                    className="param-input"
                    defaultValue={item.mv}
                  />
                </div>
              </div>
              
              <div>
                <div className="item-attribute-title">Абс. звездная величина</div>
                <div className="item-value">
                  <span>{item.asw}</span>
                </div>
              </div>
              
              <div>
                <div className="item-attribute-title">Расстояние</div>
                <div className="item-value">
                  <span>{item.distance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CepheidCalcCard;
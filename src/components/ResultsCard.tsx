import type { FC } from 'react';
import { Card } from 'react-bootstrap';

interface ResultsCardProps {
  itemsCount: number;
  onCalculate: () => void;
  onClose: () => void;
}

const ResultsCard: FC<ResultsCardProps> = ({
  itemsCount,
  onCalculate,
  onClose
}) => {
  return (
    <Card className="results-section">
      <Card.Body>
        <Card.Title>Промежуточные итоги</Card.Title>
        
        <div className="results-grid">
          <div className="result-item">
            <div className="result-value">{itemsCount}</div>
            <div className="result-label">Количество услуг в заказе</div>
          </div>
          <div className="result-item">
            <div className="result-value">±42,000</div>
            <div className="result-label">Погрешность расстояния (пк)</div>
          </div>
          <div className="result-item">
            <div className="result-value">±0.15</div>
            <div className="result-label">Погрешность АЗВ (m)</div>
          </div>
        </div>

        <button className="calculate-btn" onClick={onCalculate}>
          Выполнить расчет
        </button>
        
        <button className="close-btn" onClick={onClose}>
          Удалить заявку
        </button>
      </Card.Body>
    </Card>
  );
};

export default ResultsCard;
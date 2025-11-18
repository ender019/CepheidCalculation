import type { FC } from 'react';
import { Card } from 'react-bootstrap';

interface CalculationInfoCardProps {
  calculationId: string;
  createdAt: string;
  ka: string;
  kb: string;
  onKaChange: (value: string) => void;
  onKbChange: (value: string) => void;
  onSaveCoeffs: () => void;
}

const CalculationInfoCard: FC<CalculationInfoCardProps> = ({
  calculationId,
  createdAt,
  ka,
  kb,
  onKaChange,
  onKbChange,
  onSaveCoeffs
}) => {
  return (
    <Card className="cepheid_calc-info">
      <Card.Body>
        <div className="cepheid_calc-header">
          <Card.Title className="cepheid_calc-title">
            Заявка #{calculationId}
          </Card.Title>
          <span className="cepheid_calc-status">В процессе</span>
        </div>

        <div className="cepheid_calc-details">
          <div className="detail-item">
            <div className="detail-title">Создана:</div>
            <div className="detail-content">{createdAt}</div>
          </div>
          <div className="detail-item">
            <div className="detail-title">Метод рассчета:</div>
            <div className="detail-content">Классический метод цефеид</div>
          </div>
        </div>

        <div className="coeffs-editable">
          <div>
            <div className="detail-title">Коэффициент a:</div>
            <input
              type="text"
              className="coeff-input"
              value={ka}
              onChange={(e) => onKaChange(e.target.value)}
            />
          </div>
          <div>
            <div className="detail-title">Коэффициент b:</div>
            <input
              type="text"
              className="coeff-input"
              value={kb}
              onChange={(e) => onKbChange(e.target.value)}
            />
          </div>
          <button className="save-btn" onClick={onSaveCoeffs}>
            Сохранить
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CalculationInfoCard;
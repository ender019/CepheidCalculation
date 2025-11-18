import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import type { CepheidCalc } from '../types/api';
import { cepheidCalcService } from '../services/api';
import { ROUTE_LABELS } from '../Routes';
import Breadcrumbs from '../components/Breadcrumbs';
import CalculationInfoCard from '../components/CalculationInfoCard';
import CepheidCalcCard from '../components/CepheidCalcCard';
import ResultsCard from '../components/ResultsCard';

const CepheidCalcPage: FC = () => {
  const [cepheidCalc, setCepheidCalc] = useState<CepheidCalc | null>(null);
  const [loading, setLoading] = useState(true);
  const [ka, setKa] = useState('');
  const [kb, setKb] = useState('');

  useEffect(() => {
    loadCepheidCalc();
  }, []);

  const loadCepheidCalc = async () => {
    setLoading(true);
    try {
      const data = await cepheidCalcService.getCepheidCalcById(id);
      setCepheidCalc(data);
      setKa(data.ka);
      setKb(data.kb);
    } catch (error) {
      console.error('Ошибка загрузки расчета:', error);
    }
    setLoading(false);
  };

  const handleSaveCoeffs = () => {
    alert('Коэффициенты сохранены');
  };

  const handleCalculate = () => {
    alert('Расчет выполнен');
  };

  const handleClose = () => {
    alert('Заявка удалена');
  };

  if (loading) {
    return (
      <Container className="py-4">
        <Alert variant="info">Загрузка...</Alert>
      </Container>
    );
  }

  if (!cepheidCalc) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Заявка не найдена</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Breadcrumbs crumbs={[
        { label: ROUTE_LABELS.CEPHEID_CALC }
      ]} />

      <CalculationInfoCard
        calculationId={cepheidCalc.id}
        createdAt={cepheidCalc.created_at}
        ka={ka}
        kb={kb}
        onKaChange={setKa}
        onKbChange={setKb}
        onSaveCoeffs={handleSaveCoeffs}
      />

      <Card className="cepheids-list-container">
        <Card.Body>
          <Card.Title>Цефеиды в заявке</Card.Title>
          {cepheidCalc.items.map((item, index) => (
            <CepheidCalcCard key={index} item={item} />
          ))}
        </Card.Body>
      </Card>

      <ResultsCard
        itemsCount={cepheidCalc.items.length}
        onCalculate={handleCalculate}
        onClose={handleClose}
      />
    </Container>
  );
};

export default CepheidCalcPage;
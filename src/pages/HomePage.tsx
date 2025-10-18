import type { FC } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';
import Breadcrumbs from '../components/Breadcrumbs';

const HomePage: FC = () => {
  return (
    <Container className="py-4">
      <Breadcrumbs crumbs={[]} />
      
      <Row className="mb-5">
        <Col lg={8}>
          <h1 className="font-orbitron text-primary-custom mb-4">
            Цефеиды - Калькулятор расстояний
          </h1>
          <p className="lead mb-4">
            Современный веб-инструмент для астрономических расчетов расстояний 
            до звезд на основе метода цефеид.
          </p>
          <p className="mb-4">
            Цефеиды — это класс пульсирующих переменных звёзд с точной зависимостью 
            период—светимость, что делает их одними из самых важных «стандартных свечей» 
            в астрономии для определения межгалактических расстояний.
          </p>
          <Link to={ROUTES.CEPHEIDS} className="catalog-btn">
            Перейти к каталогу цефеид
          </Link>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="font-orbitron text-primary-custom mb-4">О проекте</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="card-custom h-100">
                <Card.Body>
                  <Card.Title className="font-orbitron text-primary-custom">
                    📊 Научная база
                  </Card.Title>
                  <Card.Text>
                    Используем актуальные данные космических телескопов Хаббл, Gaia и других обсерваторий.
                    Все цефеиды проходят строгую верификацию.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="card-custom h-100">
                <Card.Body>
                  <Card.Title className="font-orbitron text-primary-custom">
                    🔭 Точные расчеты
                  </Card.Title>
                  <Card.Text>
                    Применяем современные алгоритмы для вычисления расстояний 
                    с минимальной погрешностью. Учитываем все необходимые параметры.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="card-custom h-100">
                <Card.Body>
                  <Card.Title className="font-orbitron text-primary-custom">
                    🌌 Образовательная цель
                  </Card.Title>
                  <Card.Text>
                    Проект создан для студентов, астрономов-любителей и исследователей. 
                    Простой интерфейс и подробные описания.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <h2 className="font-orbitron text-primary-custom mb-4">Метод цефеид</h2>
          <div className="bg-light-custom p-4 rounded">
            <p>
              <strong>Метод цефеид</strong> — один из важнейших методов определения расстояний в астрономии, 
              основанный на зависимости период-светимость, открытой Генриеттой Ливитт в 1912 году.
            </p>
            <p className="mb-0">
              Цефеиды служат «стандартными свечами» благодаря тому, что их светимость напрямую связана 
              с периодом пульсаций. Измерив период изменения блеска цефеиды, можно определить её 
              абсолютную звёздную величину, а сравнив с видимой — вычислить расстояние.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
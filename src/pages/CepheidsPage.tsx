import { FC, useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Cepheid } from '../types';
import { cepheidService } from '../services/api';
import { ROUTES, ROUTE_LABELS } from '../Routes';
import Breadcrumbs from '../components/Breadcrumbs';
import CepheidCard from '../components/CepheidCard';

const CepheidsPage: FC = () => {
  const [cepheids, setCepheids] = useState<Cepheid[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    query: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadCepheids();
  }, []);

  const loadCepheids = async (filterParams = {}) => {
    setLoading(true);
    try {
      const data = await cepheidService.getCepheids(filterParams);
      setCepheids(data);
    } catch (error) {
      console.error('Ошибка загрузки цефеид:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadCepheids(filters);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDetailsClick = (cepheidId: string) => {
    navigate(`${ROUTES.CEPHEID}/${cepheidId}`);
  };

  return (
    <>
      {/* Секция поиска внутри основного контейнера */}
      <Container className="main-container">
        <Breadcrumbs crumbs={[
          { label: ROUTE_LABELS.CEPHEIDS }
        ]} />

        <section className="search-section">
          <form className="search-form" onSubmit={handleSearch}>
            <input 
              type="text" 
              name="query" 
              className="search-input" 
              placeholder="Поиск по каталогу..." 
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
            />
            <button type="submit" className="search-btn">Найти</button>
          </form>
        </section>
        
        <h1>Каталог цефеид</h1>

        {/* Сетка цефеид */}
        {loading ? (
          <Alert variant="info">Загрузка...</Alert>
        ) : (
          <div className="cepheids-grid">
            {cepheids.map(cepheid => (
              <CepheidCard
                key={cepheid.id}
                cepheid={cepheid}
                onDetailsClick={handleDetailsClick}
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default CepheidsPage;
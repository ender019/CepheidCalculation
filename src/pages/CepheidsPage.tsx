import { type FC, useState, useEffect, useMemo } from 'react'; // Добавили useMemo в импорт
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { Cepheid } from '../types/index';
import { cepheidService } from '../services/api';
import { ROUTES, ROUTE_LABELS } from '../Routes';
import Breadcrumbs from '../components/Breadcrumbs';
import CepheidCard from '../components/CepheidCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setFilters, clearFilters } from '../store/slices/filterSlice';

const CepheidsPage: FC = () => {
  const [cepheids, setCepheids] = useState<Cepheid[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Redux state - используем существующую структуру фильтров
  const activeFilters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const hasActiveSearch = useMemo(() => {
    return !!(activeFilters.titile && activeFilters.titile.trim() !== '');
  }, [activeFilters.titile]);

  // Обрабатываем изменения фильтров
  useEffect(() => {
    // Восстанавливаем поисковый запрос из Redux при загрузке
    if (activeFilters.titile) {
      setSearchQuery(activeFilters.titile);
    }

    if (activeFilters.titile && activeFilters.titile.trim() !== '') {
      loadCepheidsWithFilter(activeFilters.titile);
    } else {
      loadCepheids();
    }
  }, [activeFilters]);

  const loadCepheids = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cepheidService.getCepheids();
      setCepheids(data);
    } catch (err) {
      console.error('Ошибка загрузки цефеид:', err);
      setError('Не удалось загрузить данные цефеид');
    } finally {
      setLoading(false);
    }
  };

  const loadCepheidsWithFilter = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await cepheidService.getCepheidsByFilter({query: query});
      setCepheids(data);
    } catch (err) {
      console.error('Ошибка загрузки цефеид:', err);
      setError('Не удалось загрузить данные цефеид');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      dispatch(clearFilters());
    } else {
      dispatch(setFilters({ titile: searchQuery }));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    dispatch(clearFilters());
  };

  const handleDetailsClick = (cepheidId: string) => {
    navigate(`${ROUTES.CEPHEID}/${cepheidId}`);
  };

  if (error) {
    return (
      <Container className="main-container">
        <Breadcrumbs crumbs={[
          { label: ROUTE_LABELS.CEPHEIDS }
        ]} />
        <div className="error-container">
          <Alert variant="danger">
            <h3>Ошибка загрузки данных</h3>
            <p>{error}</p>
            <button
              onClick={hasActiveSearch ? () => loadCepheidsWithFilter(activeFilters.titile!) : loadCepheids}
              className="retry-button"
              style={{
                background: 'var(--primary-blue)',
                color: 'var(--text-light)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Попробовать снова
            </button>
          </Alert>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container className="main-container">
        <Breadcrumbs crumbs={[
          { label: ROUTE_LABELS.CEPHEIDS }
        ]} />

        <section className="search-section">
          <h1>Каталог цефеид</h1>

          <form className="search-form" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Поиск по названию, источнику или периоду..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">Найти</button>
          </form>

          {hasActiveSearch && cepheids.length > 0 && (
            <div className="search-controls">
              <button
                className="clear-search-btn"
                onClick={handleClearSearch}
              >
                Сбросить поиск
              </button>
              <div className="search-results-info">
                Найдено: {cepheids.length} цефеид
              </div>
            </div>
          )}
        </section>

        {loading ? (
          <Alert variant="info" className="loading-alert">
            <div className="loading-spinner"></div>
            {hasActiveSearch ? 'Поиск цефеид...' : 'Загрузка цефеид...'}
          </Alert>
        ) : (
          <>
            <div className="cepheids-grid">
              {cepheids.map(cepheid => (
                <CepheidCard
                  key={cepheid.id}
                  cepheid={cepheid}
                  onDetailsClick={handleDetailsClick}
                />
              ))}
            </div>

            {cepheids.length === 0 && !loading && (
              <div className="no-results">
                <Alert variant="warning">
                  <h3>Цефеиды не найдены</h3>
                  <p>Попробуйте изменить параметры поиска</p>
                  {hasActiveSearch && (
                    <button
                      className="clear-search-btn"
                      onClick={handleClearSearch}
                      style={{
                        display: 'block',
                        margin: '10px auto 0',
                        background: 'var(--primary-blue)',
                        color: 'var(--text-light)',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Сбросить поиск
                    </button>
                  )}
                </Alert>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default CepheidsPage;
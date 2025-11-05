import { type FC, useState, useEffect } from 'react';
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
  const [filteredCepheids, setFilteredCepheids] = useState<Cepheid[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Redux state - используем существующую структуру фильтров
  const activeFilters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Восстанавливаем поисковый запрос из Redux при загрузке
    if (activeFilters.titile) {
      setSearchQuery(activeFilters.titile);
    }
    
    // Загружаем данные в зависимости от наличия фильтров
    if (activeFilters.titile && activeFilters.titile.trim() !== '') {
      loadCepheidsWithFilter(activeFilters.titile);
    } else {
      loadCepheids();
    }
  }, []);

  // Обрабатываем изменения фильтров
  useEffect(() => {
    if (activeFilters.titile && activeFilters.titile.trim() !== '') {
      loadCepheidsWithFilter(activeFilters.titile);
    } else {
      // Если фильтр очистили, загружаем все данные
      if (cepheids.length === 0) {
        loadCepheids();
      } else {
        // Или просто показываем все загруженные данные
        setFilteredCepheids(cepheids);
      }
    }
  }, [activeFilters, cepheids]);

  const loadCepheids = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cepheidService.getCepheids();
      setCepheids(data);
      setFilteredCepheids(data);
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
      // Предполагаем, что у cepheidService есть метод getCepheidsByFilter
      const data = await cepheidService.getCepheidsByFilter({ query });
      setFilteredCepheids(data);
      
      // Также обновляем основной список, если нужно
      if (cepheids.length === 0) {
        setCepheids(data);
      }
    } catch (err) {
      console.error('Ошибка загрузки отфильтрованных цефеид:', err);
      setError('Не удалось загрузить отфильтрованные данные');
      
      // Fallback: фильтруем локально, если API не поддерживает фильтрацию
      const filtered = cepheids.filter(cepheid =>
        cepheid.title.toLowerCase().includes(query.toLowerCase()) ||
        cepheid.source.toLowerCase().includes(query.toLowerCase()) ||
        cepheid.period.toString().includes(query)
      );
      setFilteredCepheids(filtered);
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

  const hasActiveSearch = activeFilters.titile && activeFilters.titile.trim() !== '';

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

          {hasActiveSearch && (
            <div className="search-controls">
              <button
                className="clear-search-btn"
                onClick={handleClearSearch}
              >
                Сбросить поиск
              </button>
              <div className="search-results-info">
                Найдено: {filteredCepheids.length} цефеид
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
              {filteredCepheids.map(cepheid => (
                <CepheidCard
                  key={cepheid.id}
                  cepheid={cepheid}
                  onDetailsClick={handleDetailsClick}
                />
              ))}
            </div>

            {filteredCepheids.length === 0 && !loading && (
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
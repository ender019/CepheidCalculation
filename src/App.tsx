import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CepheidsPage from './pages/CepheidsPage';
import CepheidDetailPage from './pages/CepheidDetailPage';
import { ROUTES } from './Routes';

function App() {
  return (
    <BrowserRouter basename='/Gilyazetdinov-RIP2025F'>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CEPHEIDS} element={<CepheidsPage />} />
          <Route path={`${ROUTES.CEPHEID}/:id`} element={<CepheidDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
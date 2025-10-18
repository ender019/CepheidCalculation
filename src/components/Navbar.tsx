import { FC } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../Routes';

const Navbar: FC = () => {
  return (
    <BootstrapNavbar bg="primary-custom" variant="dark" expand="lg" className="navbar-custom">
      <Container>
        <BootstrapNavbar.Brand as={Link} to={ROUTES.HOME} className="navbar-brand-custom">
          Цефеиды - Калькулятор расстояний
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={ROUTES.CEPHEIDS} className="text-light">
              {ROUTE_LABELS.CEPHEIDS}
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
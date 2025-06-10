// src/components/NavbarComponent.jsx
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-uppercase">
          CRUD RECEITA DE BOLO
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              className={({ isActive }) => (isActive ? "active fw-bold" : "")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/novo"
              className={({ isActive }) => (isActive ? "active fw-bold" : "")}
            >
              Cadastrar Usuário
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/usuarios"
              className={({ isActive }) => (isActive ? "active fw-bold" : "")}
            >
              Gerenciar Usuário
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/produtos"
              className={({ isActive }) => (isActive ? "active fw-bold" : "")}
            >
              Cadastrar Produto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

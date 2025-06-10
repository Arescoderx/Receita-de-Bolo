import React from 'react';
import { Container, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <Card className="text-center shadow">
        <Card.Body>
          <h1 className="mb-3">Bem-vindo ao Sistema de Usuários</h1>
          <p className="lead">
            Use a navegação acima para cadastrar novos usuários ou visualizar a lista existente.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;

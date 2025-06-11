import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function GerenciarCurso() {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  const carregarCursos = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/cursos");
      setCursos(data);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      alert("Erro ao carregar cursos.");
    }
  };

  const infoCurso = (id) => {
    const curso = cursos.find((c) => c.id === id);
    if (curso) {
      alert(
        `ID: ${curso.id}\nNome: ${curso.nome}\nPlataforma: ${curso.plataforma}\nCategoria: ${curso.categoria}\nStatus: ${curso.status}\nUsuário: ${curso.nomeUsuario}`
      );
    } else {
      alert("Curso não encontrado.");
    }
  };

  const deletarCurso = async (id) => {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir este curso?"
    );
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:5000/cursos/${id}`);
      alert("Curso excluído com sucesso!");
      carregarCursos();
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
      alert("Erro ao excluir curso.");
    }
  };

  useEffect(() => {
    carregarCursos();
  }, []);

  const Emandamento = cursos.filter((curso) => curso.status === "Em andamento");
  const Interessado = cursos.filter((curso) => curso.status === "Interessado");
  const Concluido = cursos.filter((curso) => curso.status === "Concluido");

  const renderTabela = (lista) => (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Plataforma</th>
          <th>Categoria</th>
          <th>Status</th>
          <th>Usuário</th>

          <th style={{ width: "216px" }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {lista.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              Nenhum livro encontrado.
            </td>
          </tr>
        ) : (
          lista.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.id}</td>
              <td>{curso.nome}</td>
              <td>{curso.plataforma}</td>
              <td>{curso.categoria}</td>
              <td>{curso.status}</td>
              <td>{curso.nomeUsuario}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/editar-curso/${curso.id}`)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deletarCurso(curso.id)}
                >
                  Excluir
                </Button>
                <Button
                  variant="info"
                  size="sm"
                  className="ms-2"
                  onClick={() => infoCurso(curso.id)}
                >
                  Detalhes
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center mt-5">Livros - Lendo</h2>
      {renderTabela(Interessado)}

      <h2 className="mb-4 text-center">Livros - Quero ler</h2>
      {renderTabela(Emandamento)}

      <h2 className="mb-4 text-center mt-5">Livros - Lido</h2>
      {renderTabela(Concluido)}
    </Container>
  );
}

export default GerenciarCurso;

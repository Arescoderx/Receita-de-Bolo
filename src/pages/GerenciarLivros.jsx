import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function GerenciarLivros() {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  const carregarLivros = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/livros");
      setLivros(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      alert("Erro ao carregar livros.");
    }
  };

  const infoLivro = (id) => {
    const livro = livros.find((l) => l.id === id);
    if (livro) {
      alert(
        `ID: ${livro.id}\nTítulo: ${livro.titulo}\nUsuário: ${livro.nomeUsuario}\nStatus: ${livro.status || "N/A"}`
      );
    } else {
      alert("Livro não encontrado.");
    }
  };

  const deletarLivro = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este livro?");
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:5000/livros/${id}`);
      alert("Livro excluído com sucesso!");
      carregarLivros();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      alert("Erro ao excluir livro.");
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  const livrosQueroLer = livros.filter((livro) => livro.status === "Quero ler");
  const livrosLendo = livros.filter((livro) => livro.status === "Lendo");
  const livrosLido = livros.filter((livro) => livro.status === "Lido");


  const renderTabela = (lista) => (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Usuário</th>
          <th>Status</th>
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
          lista.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.id}</td>
              <td>{livro.titulo}</td>
              <td>{livro.genero}</td>
              <td>{livro.nomeUsuario}</td>
              <td>{livro.status}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/editar-livro/${livro.id}`)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deletarLivro(livro.id)}
                >
                  Excluir
                </Button>
                <Button
                  variant="info"
                  size="sm"
                  className="ms-2"
                  onClick={() => infoLivro(livro.id)}
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
      <h2 className="mb-4 text-center">Livros - Quero ler</h2>
      {renderTabela(livrosQueroLer)}

      <h2 className="mb-4 text-center mt-5">Livros - Lendo</h2>
      {renderTabela(livrosLendo)}

      <h2 className="mb-4 text-center mt-5">Livros - Lido</h2>
      {renderTabela(livrosLido)}
    </Container>
  );
}

export default GerenciarLivros;

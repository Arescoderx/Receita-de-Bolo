import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const carregarUsuarios = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/usuarios");
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      alert("Erro ao carregar usuários.");
    }
  };
  const infoUsuario = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    if (usuario) {
      alert(
        `ID: ${usuario.id}\nNome: ${usuario.nome}\nEmail: ${usuario.email}`
      );
    } else {
      alert("Usuário não encontrado.");
    }
  };
  const deletarUsuario = async (id) => {
    const confirmacao = confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:5000/usuarios/${id}`);
      alert("Usuário excluído com sucesso!");
      carregarUsuarios(); // atualiza a lista
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário.");
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Lista de Usuários</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th style={{ width: "216px" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Nenhum usuário encontrado.
              </td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/editar/${usuario.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deletarUsuario(usuario.id)}
                  >
                    Excluir
                  </Button>
                  <Button
                    variant="info"
                    size="sm"
                    className="ms-2"
                    onClick={() => infoUsuario(usuario.id)}
                  >
                    Detalhes
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListaUsuarios;

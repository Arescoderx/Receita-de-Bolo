import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

function EditarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const { data } = await axios.get("http://localhost:5000/usuarios");
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        alert("Erro ao carregar usuários.");
      }
    }

    async function fetchLivro() {
      try {
        const { data } = await axios.get(`http://localhost:5000/livros/${id}`);
        setValue("titulo", data.titulo);
        setValue("autor", data.autor);
        setValue("genero", data.genero);
        setValue("status", data.status);
        setValue("nomeUsuario", data.nomeUsuario);
      } catch (error) {
        console.error("Erro ao carregar livro:", error);
        alert("Erro ao carregar os dados.");
      }
    }

    // Chamada sequencial
    fetchUsuarios().then(fetchLivro);
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/livros/${id}`, data);
      alert("Livro atualizado com sucesso!");
      navigate("/gerenciar-livros");
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      alert("Erro ao atualizar livro.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Body>
          <h3 className="mb-4 text-center">Editar Livro</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                {...register("titulo", { required: true })}
                isInvalid={errors.titulo}
                placeholder="Digite o título do livro"
              />
              <Form.Control.Feedback type="invalid">
                Título é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                {...register("autor", { required: true })}
                isInvalid={errors.autor}
                placeholder="Digite o autor do livro"
              />
              <Form.Control.Feedback type="invalid">
                Autor é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gênero</Form.Label>
              <Form.Control
                type="text"
                {...register("genero", { required: true })}
                isInvalid={errors.genero}
                placeholder="Digite o gênero do livro"
              />
              <Form.Control.Feedback type="invalid">
                Gênero é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                {...register("status", { required: true })}
                isInvalid={errors.status}
              >
                <option value="">Selecione um status</option>
                <option value="Quero ler">Quero Ler</option>
                <option value="Lendo">Lendo</option>
                <option value="Lido">Lido</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecione um status.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Funcionário Responsável</Form.Label>
              <Form.Select
                {...register("nomeUsuario", { required: true })}
                isInvalid={errors.nomeUsuario}
              >
                <option value="">Selecione um funcionário</option>
                {usuarios.map((item) => (
                  <option key={item.id} value={item.nome}>
                    {item.nome}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecione um funcionário.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">
                Salvar Livro
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditarLivro;
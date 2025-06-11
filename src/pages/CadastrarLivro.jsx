import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CadastrarLivro() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/usuarios")
      .then((response) => setUsuarios(response.data))
      .catch((error) => {
        console.error("Erro ao carregar usuários:", error);
        alert("Erro ao carregar usuários.");
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/livros", data);
      alert("Livro cadastrado com sucesso!");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao cadastrar produto.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Body>
          <h3 className="mb-4 text-center">Cadastrar Livro</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                {...register("titulo", { required: true })}
                isInvalid={errors.titulo}
                placeholder="Digite o titulo do livro"
              />
              <Form.Control.Feedback type="invalid">
                Titulo é obrigatório.
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
                Livro é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genero</Form.Label>
              <Form.Control
                type="text"
                {...register("genero", { required: true })}
                isInvalid={errors.genero}
                placeholder="Digite o genero do livro"
              />
              <Form.Control.Feedback type="invalid">
                Genero é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Status Travado em quero ler */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                {...register("status", { required: true })}
                isInvalid={errors.status}
                disabled 
              >
                <option value="Quero ler">Quero Ler</option>{" "}
                
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
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.nome}>
                    {usuario.nome}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecione um funcionário.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">
                Salvar Produto
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CadastrarLivro;

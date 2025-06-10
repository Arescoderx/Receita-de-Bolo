import { useForm } from "react-hook-form";
import axios from "axios";
import { Card, Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function CadastrarUsuario() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/usuarios", data);
      alert("Usuário cadastrado com sucesso!");
      navigate('/');
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Body>
          <h3 className="mb-4 text-center">Cadastrar Novo Usuário</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                {...register("nome", { required: true })}
                isInvalid={errors.nome}
              />
              <Form.Control.Feedback type="invalid">
                Nome é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o email"
                {...register("email", { required: true })}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                Email é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Salvar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CadastrarUsuario;

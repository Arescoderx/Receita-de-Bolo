import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const { data } = await axios.get(`http://localhost:5000/usuarios/${id}`);
        setValue('nome', data.nome);
        setValue('email', data.email);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        alert('Erro ao carregar os dados.');
      }
    }

    fetchUsuario();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/usuarios/${id}`, data);
      alert('Usuário atualizado com sucesso!');
      navigate('/usuarios');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card>
        <Card.Body>
          <h3 className="mb-4 text-center">Editar Usuário</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                {...register('nome', { required: true })}
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
                {...register('email', { required: true })}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                Email é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Salvar Alterações
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default EditarUsuario;
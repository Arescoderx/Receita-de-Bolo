import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CadastrarProduto() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    axios.get('http://localhost:5000/usuarios')
      .then(response => setUsuarios(response.data))
      .catch(error => {
        console.error('Erro ao carregar usuários:', error);
        alert('Erro ao carregar usuários.');
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/produtos', data);
      alert('Produto cadastrado com sucesso!');
      reset();
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card>
        <Card.Body>
          <h3 className="mb-4 text-center">Cadastrar Produto</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Produto</Form.Label>
              <Form.Control
                type="text"
                {...register('nome', { required: true })}
                isInvalid={errors.nome}
                placeholder="Digite o nome do produto"
              />
              <Form.Control.Feedback type="invalid">
                Nome é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                {...register('preco', { required: true })}
                isInvalid={errors.preco}
                placeholder="Digite o preço"
              />
              <Form.Control.Feedback type="invalid">
                Preço é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Funcionário Responsável</Form.Label>
              <Form.Select
                {...register('nomeUsuario', { required: true })}
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

export default CadastrarProduto;

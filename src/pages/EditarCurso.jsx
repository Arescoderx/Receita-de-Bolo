import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

function EditarCurso() {
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

    async function fetchCurso() {
      try {
        const { data } = await axios.get(`http://localhost:5000/cursos/${id}`);
        setValue("nome", data.nome);
        setValue("plataforma", data.plataforma);
        setValue("descricao", data.descricao);
        setValue("nomeUsuario", data.nomeUsuario);
        setValue("categoria", data.categoria);
        setValue("cargaHoraria", data.cargaHoraria);
        setValue("dataInicio", data.dataInicio);
        setValue("dataTermino", data.dataTermino);
        setValue("status", data.status);
        setValue("urlCertificado", data.urlCertificado);
      } catch (error) {
        console.error("Erro ao carregar curso:", error);
        alert("Erro ao carregar os dados.");
      }
    }

    fetchUsuarios().then(fetchCurso);
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/cursos/${id}`, data);
      alert("Curso atualizado com sucesso!");
      navigate("/gerenciar-cursos");
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      alert("Erro ao atualizar curso.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Body>
          <h3 className="mb-4 text-center">Cadastrar Curso</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Curso</Form.Label>
              <Form.Control
                type="text"
                {...register("nome", { required: true })}
                isInvalid={errors.nome}
                placeholder="Digite o nome do curso"
              />
              <Form.Control.Feedback type="invalid">
                Nome do curso é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Plataforma</Form.Label>
              <Form.Control
                type="text"
                {...register("plataforma", { required: true })}
                isInvalid={errors.plataforma}
                placeholder="Digite a plataforma do curso"
              />
              <Form.Control.Feedback type="invalid">
                Plataforma é obrigatória.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                {...register("categoria", { required: true })}
                isInvalid={errors.categoria}
              >
                <option value="">Selecione uma categoria</option>
                <option value="Programação">Programação</option>
                <option value="Negócios">Negócios</option>
                <option value="Saúde">Saúde</option>
                <option value="Educação">Educação</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecione uma categoria.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Carga Horaria (em horas)</Form.Label>
              <Form.Control
                type="number"
                {...register("cargaHoraria", { required: true })}
                isInvalid={errors.duracao}
                placeholder="Digite a duração do curso"
              />
              <Form.Control.Feedback type="invalid">
                Carga Horaria é obrigatória.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Usuario Responsável</Form.Label>
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
                Selecione um Usuario.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de Início</Form.Label>
              <Form.Control
                type="date"
                {...register("dataInicio", { required: true })}
                isInvalid={errors.dataInicio}
              />
              <Form.Control.Feedback type="invalid">
                Data de início é obrigatória.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de Término</Form.Label>
              <Form.Control
                type="date"
                {...register("dataTermino", { required: true })}
                isInvalid={errors.dataTermino}
              />
              <Form.Control.Feedback type="invalid">
                Data de término é obrigatória.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                {...register("status", { required: true })}
                isInvalid={errors.status}
              >
                <option value="">Selecione um status</option>
                <option value="Interessado">Interessado</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluido">Concluido</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecione um status.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("descricao", { required: true })}
                isInvalid={errors.descricao}
                placeholder="Digite a descrição do curso"
              />
              <Form.Control.Feedback type="invalid">
                Descrição é obrigatória.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL do Certificado</Form.Label>
              <Form.Control
                type="url"
                {...register("urlCertificado")}
                placeholder="Digite a URL do certificado (opcional)"
              />
              <Form.Text className="text-muted">
                Preencha apenas se o curso estiver concluído.
              </Form.Text>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">
                Salvar Curso
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditarCurso;

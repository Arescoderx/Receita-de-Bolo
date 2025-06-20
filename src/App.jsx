import NavbarComponent from "./components/NavbarComponent";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UsuarioForm from "./pages/CadastrarUsuario.jsx";
import EditarUsuario from "./pages/EditarUsuario";
import ListaUsuarios from './pages/ListaUsuarios';
import CadastrarProduto from './pages/CadastrarProduto';
import CadastrarLivro from "./pages/CadastrarLivro.jsx";
import GerenciarLivros from "./pages/GerenciarLivros.jsx";
import EditarLivro from "./pages/EditarLivro.jsx";
import CadastrarCurso from "./pages/CadastrarCurso.jsx";
import GerenciarCursos from "./pages/GerenciarCurso.jsx";
import EditarCurso from "./pages/EditarCurso.jsx";
function App() {
  return (
    <>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novo" element={<UsuarioForm />} />
          <Route path="/editar/:id" element={<EditarUsuario />} />
          <Route path="/usuarios" element={<ListaUsuarios />} />
          <Route path="/produtos" element={<CadastrarProduto />} />
          <Route path="/livros" element={<CadastrarLivro />} />
          <Route path="/gerenciar-livros" element={<GerenciarLivros />} />
          <Route path="/editar-livro/:id" element={<EditarLivro />} />
          <Route path="/cursos" element={<CadastrarCurso />} />
          <Route path="/gerenciar-cursos" element={<GerenciarCursos />} />
          <Route path="/editar-curso/:id" element={<EditarCurso />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

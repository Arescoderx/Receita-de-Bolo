import NavbarComponent from "./components/NavbarComponent";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UsuarioForm from "./pages/CadastrarUsuario.jsx";
import EditarUsuario from "./pages/EditarUsuario";
import ListaUsuarios from './pages/ListaUsuarios';
import CadastrarProduto from './pages/CadastrarProduto';
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
        </Routes>
      </div>
    </>
  );
}

export default App;

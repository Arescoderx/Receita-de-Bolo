import NavbarComponent from "./components/NavbarComponent";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UsuarioForm from "./pages/CadastrarUsuario.jsx";
import EditarUsuario from "./pages/EditarUsuario";
import ListaUsuarios from './pages/ListaUsuarios';

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
        </Routes>
      </div>
    </>
  );
}

export default App;

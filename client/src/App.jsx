import { Outlet } from "react-router-dom";

// Importação do React Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Importação do componentes do bootstrap
import Container from "react-bootstrap/Container";

// import { AuthProvider } from "./contexts/UserContext.jsx";

function App() {
  return (
    <>
      {/* <AuthProvider> */}
        <div className="App">
          <Container>
            <Outlet />
          </Container>
        </div>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;

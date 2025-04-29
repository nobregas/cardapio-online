import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/principal/Dashboard";
import Products from "./pages/principal/Products";
import Categorias from "./pages/principal/Categorias";
import Adicionais from "./pages/principal/Adicionais";
import Promocoes from "./pages/principal/Promocoes";
import Pedidos from "./pages/principal/Pedidos";
import Personalizacao from "./pages/principal/Personalizacao";
import Configuracoes from "./pages/principal/Configuracoes";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/adicionais" element={<Adicionais />} />
          <Route path="/promocoes" element={<Promocoes />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/personalizacao" element={<Personalizacao />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

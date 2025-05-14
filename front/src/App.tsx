import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/principal/dashboard/Dashboard";
import Products from "./pages/principal/produtos/Products";
import Categorias from "./pages/principal/categoria/Categorias";
import Adicionais from "./pages/principal/adicionais/Adicionais";
import Promocoes from "./pages/principal/promocoes/Promocoes";
import Configuracoes from "./pages/principal/configuracoes/Configuracoes";
import Pedidos from "./pages/principal/pedidos/Pedidos";
import Personalizacao from "./pages/principal/personalizacao/Personalizacao";

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

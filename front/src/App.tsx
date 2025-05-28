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
import NewProductPage from "./pages/principal/produtos/NewProduct";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota sem Layout */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {/* Rota pai com Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="produtos" element={<Products />} />
          <Route path="produtos/novo" element={<NewProductPage />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="adicionais" element={<Adicionais />} />
          <Route path="promocoes" element={<Promocoes />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="personalizacao" element={<Personalizacao />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

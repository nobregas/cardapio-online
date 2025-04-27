import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/produtos"
            element={
              <div className="p-6 text-xl">
                Página de Produtos em Construção
              </div>
            }
          />
          <Route
            path="/categorias"
            element={
              <div className="p-6 text-xl">
                Página de Categorias em Construção
              </div>
            }
          />
          <Route
            path="/adicionais"
            element={
              <div className="p-6 text-xl">
                Página de Adicionais em Construção
              </div>
            }
          />
          <Route
            path="/promocoes"
            element={
              <div className="p-6 text-xl">
                Página de Promoções em Construção
              </div>
            }
          />
          <Route
            path="/pedidos"
            element={
              <div className="p-6 text-xl">Página de Pedidos em Construção</div>
            }
          />
          <Route
            path="/personalizacao"
            element={
              <div className="p-6 text-xl">
                Página de Personalização em Construção
              </div>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <div className="p-6 text-xl">
                Página de Configurações em Construção
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

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
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./components/auth/AuthContext";
import FirstSteps from "./pages/auth/primeiros-passos/FirstSteps";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota sem Layout */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />

          <Route
            path="/first-steps"
            element={
              <ProtectedRoute>
                <FirstSteps />
              </ProtectedRoute>
            }
          />

          {/* Rota pai com Layout */}
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="produtos"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="produtos/novo"
              element={
                <ProtectedRoute>
                  <NewProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="categorias"
              element={
                <ProtectedRoute>
                  <Categorias />
                </ProtectedRoute>
              }
            />
            <Route
              path="adicionais"
              element={
                <ProtectedRoute>
                  <Adicionais />
                </ProtectedRoute>
              }
            />
            <Route
              path="promocoes"
              element={
                <ProtectedRoute>
                  <Promocoes />
                </ProtectedRoute>
              }
            />
            <Route
              path="pedidos"
              element={
                <ProtectedRoute>
                  <Pedidos />
                </ProtectedRoute>
              }
            />
            <Route
              path="personalizacao"
              element={
                <ProtectedRoute>
                  <Personalizacao />
                </ProtectedRoute>
              }
            />
            <Route
              path="configuracoes"
              element={
                <ProtectedRoute>
                  <Configuracoes />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

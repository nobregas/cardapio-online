import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    setTimeout(() => {
      setLoading(false);
      if (email === "admin@teste.com" && password === "123456") {
        setSuccessMessage("Login realizado com sucesso!");
        navigate("/");
      } else {
        setErrorMessage("Email ou senha incorretos");
      }
    }, 1500);
  };

  return (
    <div className="auth-bg">
      <div
        className="
          bg-white 
          rounded-[16px] 
          shadow-[0_20px_60px_rgba(0,0,0,0.3)] 
          p-0 
          w-full 
          max-w-[900px] 
          grid 
          grid-cols-2 
          min-h-[500px] 
          relative 
          z-[2] 
          overflow-hidden   
        "
      >
        {/* LEFT SIDE - BRANDING */}
        <div
          className="
                relative 
                flex 
                flex-col 
                justify-center 
                items-center 
                p-2.5 
                text-white 
                bg-gradient-to-br 
                from-[var(--primary)] 
                to-[var(--primary-dark)] 
                login-left
            "
        >
          <div className="flex flex-col items-center z-[1]">
            <div
              className="
                w-[80px] 
                h-[80px] 
                bg-white/20 
                rounded-full 
                flex 
                items-center 
                justify-center 
                mb-5 
                backdrop-blur 
                border 
                border-white/30
                "
            >
              <i className="fas fa-shop text-white text-[36px]"></i>
            </div>
            <h1 className="text-[28px] font-bold mb-2.5 text-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
              Cardápio Online
            </h1>
            <p className="text-center text-[16px] opacity-[0.9] leading-[1.5]">
              Sistema de gerenciamento completo para seu restaurante. Controle
              pedidos, cardápios e muito mais.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN */}
        <div className="flex flex-col justify-center items-center w-full p-8">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2">Bem-vindo</h2>
            <p className="text-gray-600 mb-6">
              Acesse sua conta para continuar
            </p>
            </div>

            {errorMessage && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 flex items-center">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-medium">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Lembrar de mim
                </label>
                <a href="#" className="text-sm text-red-500 hover:underline">
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <div className="divider">
                <span className="text-gray-400 bg-white px-5 relative z-[2]">ou cadastre-se com</span>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition"
                >
                  <i className="fab fa-google mr-2 google"></i> Google
                </a>
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition"
                >
                  <i className="fab fa-facebook mr-2 facebook"></i> Facebook
                </a>
              </div>
            </form>
            <p className="text-center text-gray-600 mt-6">
              Ainda não tem uma conta?
              <span className="mr-1"> </span>
              <a href="#" className="text-red-500 hover:underline" onClick={() => navigate("/register")}>
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LoginDTO } from "../../services/auth.service";
import { login as loginService } from "../../services/auth.service";
import { useAuth } from "../../components/auth/AuthContext";

const SignIn = () => {
  const { login } = useAuth();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const loginData: LoginDTO = { email, password };
      const response = await loginService(loginData);
      login(response.token);
      setSuccessMessage("Login realizado com sucesso!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.log("Error in handleSubmit: ", error);
      setErrorMessage("Email ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="auth-bg">
      <motion.div
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
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
          <motion.div
            className="flex flex-col items-center z-[1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
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
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <i className="fas fa-shop text-white text-[36px]"></i>
            </motion.div>
            <motion.h1
              className="text-[28px] font-bold mb-2.5 text-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
              variants={itemVariants}
            >
              Cardápio Online
            </motion.h1>
            <motion.p
              className="text-center text-[16px] opacity-[0.9] leading-[1.5]"
              variants={itemVariants}
            >
              Sistema de gerenciamento completo para seu restaurante. Controle
              pedidos, cardápios e muito mais.
            </motion.p>
          </motion.div>
        </div>

        {/* RIGHT SIDE - LOGIN */}
        <div className="flex flex-col justify-center items-center w-full p-8">
          <div className="w-full max-w-md">
            <motion.div
              className="flex flex-col items-center"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold mb-2">Bem-vindo</h2>
              <p className="text-gray-600 mb-6">
                Acesse sua conta para continuar
              </p>
            </motion.div>

            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 flex items-center"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {errorMessage}
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 flex items-center"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <i className="fas fa-check-circle mr-2"></i>
                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <motion.div variants={itemVariants}>
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
              </motion.div>

              <motion.div variants={itemVariants}>
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
              </motion.div>

              <motion.div
                className="flex justify-between items-center"
                variants={itemVariants}
              >
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Lembrar de mim
                </label>
                <a href="#" className="text-sm text-red-500 hover:underline">
                  Esqueceu a senha?
                </a>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Entrando..." : "Entrar"}
              </motion.button>

              <motion.div className="divider" variants={itemVariants}>
                <span className="text-gray-400 bg-white px-5 relative z-[2]">
                  ou cadastre-se com
                </span>
              </motion.div>

              <motion.div className="flex space-x-4" variants={itemVariants}>
                <motion.a
                  href="#"
                  className="flex-1 flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-google mr-2 google"></i> Google
                </motion.a>
                <motion.a
                  href="#"
                  className="flex-1 flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-facebook mr-2 facebook"></i> Facebook
                </motion.a>
              </motion.div>
            </motion.form>
            <motion.p
              className="text-center text-gray-600 mt-6"
              variants={itemVariants}
            >
              Ainda não tem uma conta?
              <span className="mr-1"> </span>
              <a
                href="#"
                className="text-red-500 hover:underline"
                onClick={() => navigate("/register")}
              >
                Cadastre-se
              </a>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;

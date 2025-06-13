/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { registerOwner, RegisterOwnerDTO } from "../../services/auth.service";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const formatPhone = (value: string) => {
    if (!value) return "";
    const digitsOnly = value.replace(/\D/g, "");
    const truncatedDigits = digitsOnly.slice(0, 11);
    if (truncatedDigits.length > 10) {
      return truncatedDigits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    if (truncatedDigits.length > 6) {
      return truncatedDigits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    if (truncatedDigits.length > 2) {
      return truncatedDigits.replace(/(\d{2})(\d+)/, "($1) $2");
    }
    if (truncatedDigits.length > 0) {
      return truncatedDigits.replace(/(\d*)/, "($1");
    }
    return truncatedDigits;
  };

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const validateField = (fieldName: string, value: string) => {
    let error = "";
    switch (fieldName) {
      case "firstName":
        error = value.trim() === "" ? "Nome é obrigatório" : "";
        break;
      case "lastName":
        error = value.trim() === "" ? "Sobrenome é obrigatório" : "";
        break;
      case "email":
        error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Email inválido"
          : "";
        break;
      case "phone": {
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length < 10) {
          error = "Telefone inválido. Deve conter 10 ou 11 dígitos.";
        } else {
          error = "";
        }
        break;
      }
      case "password":
        error =
          value.length < 8 ? "Senha deve ter pelo menos 8 caracteres" : "";
        break;
      case "confirmPassword":
        error = value !== password ? "Senhas não coincidem" : "";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return error === "";
  };

  const checkPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length === 0) {
      setPasswordStrength("weak");
      return;
    }
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) {
      setPasswordStrength("weak");
    } else if (score <= 4) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: "",
    });

    const isFirstNameValid = validateField("firstName", firstName);
    const isLastNameValid = validateField("lastName", lastName);
    const isEmailValid = validateField("email", email);
    const isPhoneValid = validateField("phone", phone);
    const isPasswordValid = validateField("password", password);
    const isConfirmPasswordValid = validateField(
      "confirmPassword",
      confirmPassword
    );

    if (!agreeTerms) {
      setErrors((prev) => ({
        ...prev,
        terms: "Você deve concordar com os termos de uso",
      }));
    }

    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPhoneValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !agreeTerms
    ) {
      setErrorMessage("Por favor, corrija os erros no formulário.");
      return;
    }

    setLoading(true);
    const fullname = `${firstName} ${lastName}`;
    const cleanedPhone = phone.replace(/\D/g, "");

    const userData: RegisterOwnerDTO = {
      name: fullname,
      email,
      phone: cleanedPhone,
      password,
    };

    try {
      await registerOwner(userData);
      setSuccessMessage("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/first-steps"), 2000);
    } catch (error: any | unknown) {
      let errorMsg = "Ocorreu um erro ao criar a conta. Tente novamente.";
      if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error?.message) {
        errorMsg = error.message;
      }
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const formContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const strengthIndicator = {
    weak: { width: "33.3%", backgroundColor: "#ef4444" },
    medium: { width: "66.6%", backgroundColor: "#f59e0b" },
    strong: { width: "100%", backgroundColor: "#22c55e" },
  };

  return (
    <div className="auth-bg">
      <motion.div
        className="bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] my-4 w-full max-w-[900px] grid grid-cols-2 min-h-[600px] relative z-[2] overflow-hidden register-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT SIDE - BRANDING */}
        <div className="relative flex flex-col justify-center items-center p-5 text-white bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] register-left">
          <motion.div
            className="flex flex-col items-center z-[1] logo-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="w-[80px] h-[80px] bg-white/20 rounded-full flex items-center justify-center mb-5 backdrop-blur-md border border-white/30 logo"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <i className="fas fa-pizza-slice text-white text-[36px]"></i>
            </motion.div>
            <h1 className="text-[28px] font-bold mb-2.5 text-shadow-[0_2px_4px_rgba(0,0,0,0.1)] brand-title">
              Cardapio Online
            </h1>
            <p className="text-center text-[16px] opacity-[0.9] leading-[1.5] brand-subtitle">
              Junte-se a centenas de restaurantes que já usam nossa plataforma
              para gerenciar seus negócios com eficiência.
            </p>
          </motion.div>
        </div>

        {/* RIGHT SIDE - REGISTER */}
        <div className="flex flex-col justify-center items-center w-full p-5 register-right overflow-y-auto">
          <div className="w-full max-w-md">
            <motion.div
              className="flex flex-col items-center register-header"
              variants={formItemVariants}
            >
              <h2 className="text-3xl font-bold mb-2 register-title">
                Criar Conta
              </h2>
              <p className="text-gray-600 mb-6 register-subtitle">
                Preencha os dados para começar
              </p>
            </motion.div>

            <AnimatePresence>
              {(errorMessage || successMessage) && (
                <motion.div
                  className={`px-4 py-2 rounded mb-4 flex items-center ${
                    errorMessage
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <i
                    className={`fas ${
                      errorMessage ? "fa-exclamation-circle" : "fa-check-circle"
                    } mr-2`}
                  ></i>
                  {errorMessage || successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-3 register-form"
              variants={formContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="grid grid-cols-2 gap-4 form-row"
                variants={formItemVariants}
              >
                <div>
                  {" "}
                  {/* First Name */}
                  <label
                    htmlFor="firstName"
                    className="block font-medium text-sm text-gray-700"
                  >
                    Nome
                  </label>
                  <input
                    id="firstName"
                    type="text" /* ...props */
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 mt-1 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      validateField("firstName", e.target.value);
                    }}
                    onBlur={(e) => validateField("firstName", e.target.value)}
                    required
                  />
                  <AnimatePresence>
                    {errors.firstName && (
                      <motion.div
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.firstName}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  {" "}
                  {/* Last Name */}
                  <label
                    htmlFor="lastName"
                    className="block font-medium text-sm text-gray-700"
                  >
                    Sobrenome
                  </label>
                  <input
                    id="lastName"
                    type="text" /* ...props */
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 mt-1 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      validateField("lastName", e.target.value);
                    }}
                    onBlur={(e) => validateField("lastName", e.target.value)}
                    required
                  />
                  <AnimatePresence>
                    {errors.lastName && (
                      <motion.div
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.lastName}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div variants={formItemVariants}>
                {" "}
                {/* Email */}
                <label
                  htmlFor="email"
                  className="block font-medium text-sm text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email" /* ...props */
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 mt-1 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField("email", e.target.value);
                  }}
                  onBlur={(e) => validateField("email", e.target.value)}
                  required
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.div
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.email}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={formItemVariants}>
                {" "}
                {/* Phone */}
                <label
                  htmlFor="phone"
                  className="block font-medium text-sm text-gray-700"
                >
                  Telefone
                </label>
                <input
                  id="phone"
                  type="tel" /* ...props */
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 mt-1 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  value={phone}
                  onChange={(e) => {
                    const val = formatPhone(e.target.value);
                    setPhone(val);
                    validateField("phone", val);
                  }}
                  onBlur={(e) => validateField("phone", e.target.value)}
                  required
                  maxLength={15}
                />
                <AnimatePresence>
                  {errors.phone && (
                    <motion.div
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.phone}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={formItemVariants}>
                {" "}
                {/* Password */}
                <label
                  htmlFor="password"
                  className="block font-medium text-sm text-gray-700"
                >
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"} /* ...props */
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 mt-1 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkPasswordStrength(e.target.value);
                      validateField("password", e.target.value);
                    }}
                    onBlur={(e) => validateField("password", e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => togglePasswordVisibility("password")}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                    <motion.div
                      className="h-1.5 rounded-full"
                      initial={false}
                      animate={passwordStrength}
                      variants={strengthIndicator}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                  <span className="text-xs text-gray-500 capitalize w-16 text-right">
                    {password.length > 0
                      ? passwordStrength
                          .replace("weak", "fraca")
                          .replace("medium", "média")
                          .replace("strong", "forte")
                      : ""}
                  </span>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.div
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.password}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={formItemVariants}>
                {" "}
                {/* Confirm Password */}
                <label
                  htmlFor="confirmPassword"
                  className="block font-medium text-sm text-gray-700"
                >
                  Confirmar Senha
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword ? "text" : "password"
                    } /* ...props */
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 mt-1 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      validateField("confirmPassword", e.target.value);
                    }}
                    onBlur={(e) =>
                      validateField("confirmPassword", e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    <i
                      className={`fas ${
                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.div
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.confirmPassword}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                className="flex items-center"
                variants={formItemVariants}
              >
                {" "}
                {/* Terms */}
                <input
                  type="checkbox"
                  id="agreeTerms"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    setErrors((prev) => ({ ...prev, terms: "" }));
                  }}
                  required
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Eu concordo com os{" "}
                  <a href="#" className="text-red-500 hover:underline">
                    Termos de Uso
                  </a>
                </label>
              </motion.div>
              <AnimatePresence>
                {errors.terms && (
                  <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-red-500 text-xs"
                  >
                    {errors.terms}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Criando..." : "Criar Conta"}
              </motion.button>

              <motion.div
                className="text-center text-sm text-gray-600 mt-4"
                variants={formItemVariants}
              >
                <p>
                  Já tem uma conta?{" "}
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/login")}
                    className="font-medium text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    Fazer login
                  </motion.a>
                </p>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;

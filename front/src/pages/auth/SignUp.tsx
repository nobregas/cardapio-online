import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("weak"); // 'weak', 'medium', 'strong'
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    restaurantName: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
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
      case "phone":
        error = !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value)
          ? "Telefone inválido"
          : "";
        break;
      case "restaurantName":
        error =
          value.trim() === "" ? "Nome do restaurante é obrigatório" : "";
        break;
      case "password":
        error =
          value.length < 6 ? "Senha deve ter pelo menos 6 caracteres" : "";
        break;
      case "confirmPassword":
        error =
          value !== password ? "Senhas não coincidem" : "";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      restaurantName: "",
      password: "",
      confirmPassword: "",
      terms: "",
    });

    const isFirstNameValid = validateField("firstName", firstName);
    const isLastNameValid = validateField("lastName", lastName);
    const isEmailValid = validateField("email", email);
    const isPhoneValid = validateField("phone", phone);
    const isRestaurantNameValid = validateField("restaurantName", restaurantName);
    const isPasswordValid = validateField("password", password);
    const isConfirmPasswordValid = validateField("confirmPassword", confirmPassword);

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
      !isRestaurantNameValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !agreeTerms
    ) {
      setLoading(false);
      setErrorMessage("Por favor, corrija os erros no formulário.");
      return;
    }

    setTimeout(() => {
      setLoading(false);
      console.log("Registration Data:", {
        firstName,
        lastName,
        email,
        phone,
        restaurantName,
        password,
      });

      setSuccessMessage("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }, 1500);
  };

  return (
    <div className="auth-bg">
      <div
        className="
          bg-white
          rounded-[16px]
          shadow-[0_20px_60px_rgba(0,0,0,0.3)]
        my-4
          w-full
          max-w-[900px]
          grid
          grid-cols-2
          min-h-[600px]
          relative
          z-[2]
          overflow-hidden
          register-container
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
                p-5
                text-white
                bg-gradient-to-br
                from-[var(--primary)]
                to-[var(--primary-dark)]
                register-left
            "
        >
          <div className="flex flex-col items-center z-[1] logo-section">
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
                backdrop-blur-md
                border
                border-white/30
                logo
                "
            >
              <i className="fas fa-pizza-slice text-white text-[36px]"></i>
            </div>
            <h1 className="text-[28px] font-bold mb-2.5 text-shadow-[0_2px_4px_rgba(0,0,0,0.1)] brand-title">
              Cardapio Online
            </h1>
            <p className="text-center text-[16px] opacity-[0.9] leading-[1.5] brand-subtitle">
              Junte-se a centenas de restaurantes que já usam nossa plataforma para gerenciar seus negócios com eficiência.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - REGISTER */}
        <div className="flex flex-col justify-center items-center w-full p-5 register-right">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center register-header">
              <h2 className="text-3xl font-bold mb-2 register-title">Criar Conta</h2>
              <p className="text-gray-600 mb-6 register-subtitle">
                Preencha os dados para começar
              </p>
            </div>

            {errorMessage && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 flex items-center error-message">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 flex items-center success-message">
                <i className="fas fa-check-circle mr-2"></i>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 register-form">
              <div className="grid grid-cols-2 gap-4 form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="block font-medium form-label">
                    Nome
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 form-control ${
                      errors.firstName ? "error" : ""
                    }`}
                    placeholder="Seu nome"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      validateField("firstName", e.target.value);
                    }}
                    onBlur={(e) => validateField("firstName", e.target.value)}
                    required
                  />
                  {errors.firstName && (
                    <div className="field-error " style={{ display: "block" }}>
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="block font-medium form-label">
                    Sobrenome
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 form-control ${
                      errors.lastName ? "error" : ""
                    }`}
                    placeholder="Seu sobrenome"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      validateField("lastName", e.target.value);
                    }}
                    onBlur={(e) => validateField("lastName", e.target.value)}
                    required
                  />
                  {errors.lastName && (
                    <div className="field-error" style={{ display: "block" }}>
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="block font-medium form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 form-control ${
                    errors.email ? "error" : ""
                  }`}
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField("email", e.target.value);
                  }}
                  onBlur={(e) => validateField("email", e.target.value)}
                  required
                />
                {errors.email && (
                  <div className="field-error" style={{ display: "block" }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="block font-medium form-label">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 form-control ${
                      errors.phone ? "error" : ""
                    }`}
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => {
                      setPhone(formatPhone(e.target.value));
                      validateField("phone", formatPhone(e.target.value));
                    }}
                    onBlur={(e) => validateField("phone", e.target.value)}
                    required
                  />
                  {errors.phone && (
                    <div className="field-error" style={{ display: "block" }}>
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="restaurantName" className="block font-medium form-label">
                    Nome do Restaurante
                  </label>
                  <input
                    id="restaurantName"
                    type="text"
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 form-control ${
                      errors.restaurantName ? "error" : ""
                    }`}
                    placeholder="Meu Restaurante"
                    value={restaurantName}
                    onChange={(e) => {
                      setRestaurantName(e.target.value);
                      validateField("restaurantName", e.target.value);
                    }}
                    onBlur={(e) => validateField("restaurantName", e.target.value)}
                    required
                  />
                  {errors.restaurantName && (
                    <div className="field-error" style={{ display: "block" }}>
                      {errors.restaurantName}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="block font-medium form-label">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 form-control ${
                      errors.password ? "error" : ""
                    }`}
                    placeholder="••••••••"
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
                    className="absolute right-3 top-2.5 text-gray-500 password-toggle"
                    onClick={() => togglePasswordVisibility("password")}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className={`strength-fill ${
                        passwordStrength === "weak"
                          ? "bg-red-500 w-1/3"
                          : passwordStrength === "medium"
                          ? "bg-yellow-500 w-2/3"
                          : "bg-green-500 w-full"
                      }`}
                    ></div>
                  </div>
                  <span className="strength-text text-xs text-gray-500">
                    {password.length === 0
                      ? "Digite uma senha"
                      : passwordStrength === "weak"
                      ? "Senha fraca"
                      : passwordStrength === "medium"
                      ? "Senha média"
                      : "Senha forte"}
                  </span>
                </div>
                {errors.password && (
                  <div className="field-error" style={{ display: "block" }}>
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="block font-medium form-label">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 form-control ${
                      errors.confirmPassword ? "error" : ""
                    }`}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      validateField("confirmPassword", e.target.value);
                    }}
                    onBlur={(e) => validateField("confirmPassword", e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500 password-toggle"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    <i
                      className={`fas ${
                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="field-error" style={{ display: "block" }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <div className="flex items-center mt-4 terms-checkbox">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  className="mr-2"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    setErrors((prev) => ({ ...prev, terms: "" })); // Clear terms error on change
                  }}
                  required
                />
                <label htmlFor="agreeTerms" className="text-gray-600 text-sm">
                  Eu concordo com os{" "}
                  <a href="#" target="_blank" className="text-red-500 hover:underline">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="#" target="_blank" className="text-red-500 hover:underline">
                    Política de Privacidade
                  </a>
                </label>
              </div>
              {errors.terms && (
                <div className="field-error" style={{ display: "block" }}>
                  {errors.terms}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition register-button"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading" style={{ display: "inline-block" }}></span>
                ) : (
                  "Criar Conta"
                )}
              </button>

              <div className="divider">
                <span className="text-gray-400 bg-white px-5 relative z-[2]">
                  ou cadastre-se com
                </span>
              </div>

              <div className="flex space-x-4 social-register">
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition social-btn"
                >
                  <i className="fab fa-google mr-2 google"></i> Google
                </a>
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition social-btn"
                >
                  <i className="fab fa-facebook mr-2 facebook"></i> Facebook
                </a>
              </div>
            </form>
            <p className="text-center text-gray-600 mt-6 login-link">
              Já tem uma conta?{" "}
              <a href="#" className="text-red-500 hover:underline" onClick={() => navigate("/login")}>
                Fazer login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
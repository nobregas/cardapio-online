import { useState, FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurant } from "../../../hooks/useRestaurant";
import { CreateRestaurantDTO } from "../../../services/restaurant.service";
import Step1DadosBasicos from "./_components/Step1DadosBasicos";
import Step5Finalizar from "./_components/Step5Finalizar";
import Step4Pagamento from "./_components/Step4Pagamento";
import Step3Configuracoes from "./_components/Step3Configuracoes";
import Step2Endereco from "./_components/Step2Endereco";
import { formatCNPJ, formatPhone } from "../../../utils";

interface Errors {
  restaurantName?: string;
  cnpj?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  cep?: string;
  workingDays?: string;
}

interface ThemeColors {
  [key: string]: {
    bg: string;
    hover: string;
    ring: string;
    border: string;
    text: string;
  };
}

const PrimeirosPassos: FC = () => {
  const navigate = useNavigate();
  const { createRestaurant, loading, error, clearError } = useRestaurant();

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [restaurantName, setRestaurantName] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");
  const [description, setDescription] = useState("");

  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [language, setLanguage] = useState("pt-BR");
  const [currency, setCurrency] = useState("BRL");
  const [theme, setTheme] = useState("orange");
  const [openTime, setOpenTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("22:00");

  const [onlinePayment, setOnlinePayment] = useState(false);
  const [deliveryPayment, setDeliveryPayment] = useState(true);
  const [acceptsCash, setAcceptsCash] = useState(true);
  const [acceptsCard, setAcceptsCard] = useState(true);
  const [acceptsPix, setAcceptsPix] = useState(true);

  const [errors, setErrors] = useState<Errors>({});

  const steps = [
    { id: 1, title: "Dados Básicos", icon: "fas fa-store" },
    { id: 2, title: "Endereço", icon: "fas fa-map-marker-alt" },
    { id: 3, title: "Configurações", icon: "fas fa-cog" },
    { id: 4, title: "Pagamentos", icon: "fas fa-credit-card" },
    { id: 5, title: "Finalizar", icon: "fas fa-check-circle" },
  ];

  const themeColors: ThemeColors = {
    red: {
      bg: "bg-red-500",
      hover: "hover:bg-red-600",
      ring: "focus:ring-red-500",
      border: "border-red-500",
      text: "text-red-500",
    },
    orange: {
      bg: "bg-orange-500",
      hover: "hover:bg-orange-600",
      ring: "focus:ring-orange-500",
      border: "border-orange-500",
      text: "text-orange-500",
    },
    green: {
      bg: "bg-green-500",
      hover: "hover:bg-green-600",
      ring: "focus:ring-green-500",
      border: "border-green-500",
      text: "text-green-500",
    },
    blue: {
      bg: "bg-blue-500",
      hover: "hover:bg-blue-600",
      ring: "focus:ring-blue-500",
      border: "border-blue-500",
      text: "text-blue-500",
    },
    purple: {
      bg: "bg-purple-500",
      hover: "hover:bg-purple-600",
      ring: "focus:ring-purple-500",
      border: "border-purple-500",
      text: "text-purple-500",
    },
  };

  const daysOfWeek = [
    { key: "mon", label: "Segunda" },
    { key: "tue", label: "Terça" },
    { key: "wed", label: "Quarta" },
    { key: "thu", label: "Quinta" },
    { key: "fri", label: "Sexta" },
    { key: "sat", label: "Sábado" },
    { key: "sun", label: "Domingo" },
  ];

  const toggleWorkingDay = (day: string) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
    if (errors.workingDays) {
      setErrors((prev) => ({ ...prev, workingDays: undefined }));
    }
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Errors = {};

    switch (step) {
      case 1:
        if (!restaurantName.trim())
          newErrors.restaurantName = "Nome é obrigatório";
        if (!cnpj.trim() || cnpj.replace(/\D/g, "").length !== 14)
          newErrors.cnpj = "CNPJ inválido";
        if (!phone.trim() || phone.replace(/\D/g, "").length < 10)
          newErrors.phone = "Telefone inválido";
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
          newErrors.email = "Email inválido";
        break;
      case 2:
        if (!address.trim()) newErrors.address = "Endereço é obrigatório";
        if (!city.trim()) newErrors.city = "Cidade é obrigatória";
        if (!state.trim()) newErrors.state = "Estado é obrigatório";
        if (!cep.trim() || cep.replace(/\D/g, "").length !== 8)
          newErrors.cep = "CEP inválido";
        break;
      case 3:
        if (workingDays.length === 0)
          newErrors.workingDays =
            "Selecione pelo menos um dia de funcionamento";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1DadosBasicos
            restaurantName={restaurantName}
            setRestaurantName={setRestaurantName}
            logo={logo}
            handleLogoUpload={handleLogoUpload}
            cnpj={cnpj}
            setCnpj={(value) => setCnpj(formatCNPJ(value))}
            phone={phone}
            setPhone={(value) => setPhone(formatPhone(value))}
            email={email}
            setEmail={setEmail}
            errors={errors}
            currentTheme={currentTheme}
          />
        );
      case 2:
        return (
          <Step2Endereco
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            cep={cep}
            setCep={setCep}
            description={description}
            setDescription={setDescription}
            errors={errors}
            currentTheme={currentTheme}
          />
        );
      case 3:
        return (
          <Step3Configuracoes
            workingDays={workingDays}
            toggleWorkingDay={toggleWorkingDay}
            openTime={openTime}
            setOpenTime={setOpenTime}
            closeTime={closeTime}
            setCloseTime={setCloseTime}
            language={language}
            setLanguage={setLanguage}
            currency={currency}
            setCurrency={setCurrency}
            theme={theme}
            setTheme={setTheme}
            currentTheme={currentTheme}
            errors={{
              workingDays: errors.workingDays,
            }}
            daysOfWeek={daysOfWeek}
            themeColors={themeColors}
          />
        );
      case 4:
        return (
          <Step4Pagamento
            onlinePayment={onlinePayment}
            setOnlinePayment={setOnlinePayment}
            deliveryPayment={deliveryPayment}
            setDeliveryPayment={setDeliveryPayment}
            acceptsCash={acceptsCash}
            setAcceptsCash={setAcceptsCash}
            acceptsCard={acceptsCard}
            setAcceptsCard={setAcceptsCard}
            acceptsPix={acceptsPix}
            setAcceptsPix={setAcceptsPix}
            currentTheme={currentTheme}
          />
        );
      case 5:
        return (
          <Step5Finalizar
            finishSetup={finishSetup}
            restaurantName={restaurantName}
            city={city}
            state={state}
            email={email}
            theme={theme}
            phone={phone}
            workingDays={workingDays}
            currentTheme={currentTheme}
            isSubmitting={isSubmitting}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  const nextStep = () => {
    if (error) {
      clearError();
    }

    if (validateStep(currentStep)) {
      setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
      if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (stepId: number) => {
    if (
      completedSteps.includes(stepId) ||
      completedSteps.includes(stepId - 1)
    ) {
      setCurrentStep(stepId);
    }
  };

  const finishSetup = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      alert("Por favor, verifique os dados preenchidos nos passos anteriores.");
      return;
    }

    setIsSubmitting(true);

    try {
      const restaurantData: CreateRestaurantDTO = {
        name: restaurantName,
        email,
        phone: phone.replace(/\D/g, ""),
        cnpj: cnpj.replace(/\D/g, ""),
        logo: "logo",
        description: description || undefined,
        address: {
          street: address,
          city,
          state,
          zipCode: cep.replace(/\D/g, ""),
        },
      };

      const paymentMethods = {
        onlinePayment,
        deliveryPayment,
        acceptsCash,
        acceptsCard,
        acceptsPix,
      };

      const settings = {
        language,
        currency,
        theme,
        workingDays,
        workingHours: {
          open: openTime,
          close: closeTime,
        },
      };
      console.log(settings, paymentMethods);

      console.log("Enviando dados do restaurante:", restaurantData);

      const createdRestaurant = await createRestaurant(restaurantData);

      if (createdRestaurant) {
        console.log("Restaurante criado com sucesso:", createdRestaurant);

        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Erro ao criar restaurante:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentTheme = themeColors[theme];

  return (
    <div className="min-h-screen auth-bg backdrop-blur-xl flex items-center justify-center p-4">
      <div
        className="relative z-10 w-full max-w-4xl mx-auto rounded-[24px] bg-gradient-to-br 
             from-[var(--primary)] 
             to-[var(--primary-dark)] p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8 p-4">
          <div className="flex items-center justify-center mb-4">
            <div
              className={`w-16 h-16 ${currentTheme.bg} rounded-full flex items-center justify-center text-white text-2xl shadow-lg`}
            >
              <i className="fas fa-store"></i>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Bem-vindo ao Cardápio Online!
          </h1>
          <p className="text-white">
            Vamos configurar seu restaurante em poucos passos.
          </p>
        </div>

        {/* Exibir erro global se houver */}
        {error && currentStep !== 5 && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              <span>{error}</span>
              <button
                onClick={clearError}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}

        {/* Barra de Progresso */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                  step.id === currentStep
                    ? `bg-white ${currentTheme.border} ${currentTheme.text} ring-4 ${currentTheme.ring}/50`
                    : completedSteps.includes(step.id)
                    ? `${currentTheme.bg} border-transparent text-white`
                    : "border-gray-500 text-gray-400 bg-gray-700"
                }`}
                onClick={() => goToStep(step.id)}
                style={{ marginRight: index < steps.length - 1 ? "1.5rem" : 0 }}
              >
                {completedSteps.includes(step.id) && step.id !== currentStep ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i className={`${step.icon}`}></i>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-auto h-1 transition-colors duration-500 ${
                    completedSteps.includes(step.id)
                      ? currentTheme.bg
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Conteúdo da Etapa */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Step Content */}
            {renderCurrentStep()}

            {/* Botões de Navegação */}
            <div className="mt-10 flex justify-between items-center">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={loading || isSubmitting}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Voltar
                  </button>
                )}
              </div>
              <div>
                {currentStep < steps.length && (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={loading || isSubmitting}
                    className={`${currentTheme.bg} ${currentTheme.hover} text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Carregando...
                      </>
                    ) : (
                      <>
                        Avançar
                        <i className="fas fa-arrow-right ml-2"></i>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrimeirosPassos;

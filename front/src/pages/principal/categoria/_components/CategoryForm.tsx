/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SwitchButton from "../../../../components/ui/SwitchButton";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../../hooks/useCategory";

const CategoryForm = () => {
  const navigate = useNavigate();
  const { addCategory, loading } = useCategories();

  // Estados para os campos do formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("1");
  const [isActive, setIsActive] = useState(true);

  // Estados para feedback visual
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Variantes de animação para o formulário
  const formVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  // Variantes para os campos do formulário
  const fieldVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Variantes para o modal
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  // Variantes para o overlay do modal
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  // Variantes para os botões
  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  // Variantes para a barra de loading
  const loadingBarVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${loadingProgress}%`,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Variantes para o modal de sucesso
  const successModalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: -100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        bounce: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: -100,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const confirmCancel = () => {
    setShowCancelConfirmation(false);
    navigate("/categorias");
  };

  const abortCancel = () => {
    setShowCancelConfirmation(false);
  };

  const simulateLoadingProgress = () => {
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 100);
    return interval;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const categoryData = {
      name,
      description,
      order: Number(order),
      image: "",
      isActive,
    };

    // Iniciar simulação de progresso
    const progressInterval = simulateLoadingProgress();

    try {
      await addCategory(categoryData);

      // Completar a barra de loading
      clearInterval(progressInterval);
      setLoadingProgress(100);

      // Aguardar um pouco antes de mostrar o sucesso
      setTimeout(() => {
        setShowSuccessModal(true);
        toast.success("Categoria criada com sucesso!");

        // Fechar modal de sucesso e navegar após 2 segundos
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/categorias");
        }, 2000);
      }, 500);
    } catch (error: any) {
      clearInterval(progressInterval);
      setLoadingProgress(0);
      console.error("Erro ao criar categoria:", error);
      toast.error(
        error.message || "Não foi possível criar a categoria. Tente novamente."
      );
    }
  };

  return (
    <>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Barra de Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Criando categoria...
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(loadingProgress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full relative"
                  variants={loadingBarVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Efeito de brilho na barra */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            variants={fieldVariants}
          >
            <motion.div variants={fieldVariants}>
              <label className="block mb-2 font-medium text-gray-700">
                Nome da categoria*
              </label>
              <motion.input
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition-colors duration-200"
                placeholder="Ex: Pizzas Tradicionais"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                whileFocus={{
                  borderColor: "#f97316",
                  boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)",
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block mb-2 font-medium text-gray-700">
                Ordem de exibição*
              </label>
              <motion.input
                type="number"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition-colors duration-200"
                placeholder="1"
                min="1"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                required
                disabled={loading}
                whileFocus={{
                  borderColor: "#f97316",
                  boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)",
                }}
                transition={{ duration: 0.2 }}
              />
              <p className="text-xs text-gray-500 mt-1">
                Define a ordem em que a categoria aparece no menu.
              </p>
            </motion.div>
          </motion.div>

          <motion.div className="mb-6" variants={fieldVariants}>
            <label className="block mb-2 font-medium text-gray-700">
              Descrição
            </label>
            <motion.textarea
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 min-h-24 resize-y transition-colors duration-200"
              placeholder="Ex: As pizzas mais clássicas e adoradas pelos nossos clientes"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              whileFocus={{
                borderColor: "#f97316",
                boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)",
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          <motion.div className="mb-6" variants={fieldVariants}>
            <label className="block mb-2 font-medium text-gray-700">
              Status da Categoria
            </label>
            <div className="flex items-center gap-3 mt-2">
              <motion.div
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <SwitchButton
                  checked={isActive}
                  onChange={(value) => setIsActive(value)}
                />
              </motion.div>
              <motion.span
                className="text-sm text-gray-600"
                animate={{
                  color: isActive ? "#16a34a" : "#dc2626",
                }}
                transition={{ duration: 0.3 }}
              >
                {isActive ? "Categoria ativa" : "Categoria inativa"}
              </motion.span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Categorias inativas não aparecem no menu para os clientes.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-end gap-4 mt-8"
            variants={fieldVariants}
          >
            <motion.button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCancel}
              disabled={loading}
              variants={buttonVariants}
              initial="rest"
              whileHover={loading ? "rest" : "hover"}
              whileTap={loading ? "rest" : "tap"}
            >
              Cancelar
            </motion.button>

            <motion.button
              type="submit"
              className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={loading}
              variants={buttonVariants}
              initial="rest"
              whileHover={loading ? "rest" : "hover"}
              whileTap={loading ? "rest" : "tap"}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Salvando...
                  </motion.div>
                ) : (
                  <motion.div
                    key="save"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <i className="fas fa-save mr-2" />
                    Salvar Categoria
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>

      {/* Modal de Confirmação de Cancelamento */}
      <AnimatePresence>
        {showCancelConfirmation && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="absolute inset-0 bg-black"
              variants={overlayVariants}
              onClick={abortCancel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full z-10 mx-4"
              variants={modalVariants}
            >
              <motion.h3
                className="text-lg font-medium text-gray-900 mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Deseja realmente cancelar?
              </motion.h3>
              <motion.p
                className="text-gray-600 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Todas as informações preenchidas serão perdidas.
              </motion.p>
              <motion.div
                className="flex justify-center gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={abortCancel}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Voltar
                </motion.button>
                <motion.button
                  onClick={confirmCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Confirmar Cancelamento
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Sucesso */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="absolute inset-0 bg-black"
              variants={overlayVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full z-10 mx-4 text-center"
              variants={successModalVariants}
            >
              {/* Ícone de sucesso animado */}
              <motion.div
                className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              >
                <motion.i
                  className="fas fa-check text-2xl text-green-600"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
                />
              </motion.div>

              <motion.h3
                className="text-xl font-semibold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Categoria criada com sucesso!
              </motion.h3>

              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                A categoria "{name}" foi adicionada ao seu menu.
              </motion.p>

              {/* Barra de progresso para o fechamento automático */}
              <motion.div
                className="w-full bg-gray-200 rounded-full h-1 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="h-1 bg-green-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 2, ease: "linear" }}
                />
              </motion.div>

              <motion.p
                className="text-xs text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Redirecionando automaticamente...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategoryForm;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { adicionais, categories } from "../../../../data/mockData";
import { Adicional } from "../../../../types";
import SwitchButton from "../../../../components/ui/SwitchButton";
import { toast } from "react-hot-toast";

const ProductsForm = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscountPrice, setProductDiscountPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productIsActive, setProductIsActive] = useState(true);

  const [selectedAddicionals, setSelectedAddtionals] = useState<
    Adicional[] | null
  >(null);
  const [newAdditionalName, setNewAdditionalName] = useState("");
  const [newAdditionalPrice, setNewAdditionalPrice] = useState("");

  // Estados para feedback visual
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

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

  const imageUploadVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const confirmCancel = () => {
    setShowCancelConfirmation(false);
    navigate("/produtos");
  };

  const abortCancel = () => {
    setShowCancelConfirmation(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAdditional = (id: string) => {
    const additional = adicionais.find((a) => a.id === id);
    if (additional) {
      setSelectedAddtionals((prev) =>
        prev ? [...prev, additional] : [additional]
      );
    }
  };

  const removeAdditional = (id: string) => {
    setSelectedAddtionals((prev) =>
      prev ? prev.filter((a) => a.id !== id) : null
    );
  };

  const addCustomAdditional = () => {
    if (newAdditionalName && newAdditionalPrice) {
      const customAdditional: Adicional = {
        id: Date.now().toString(),
        name: newAdditionalName,
        price: parseFloat(newAdditionalPrice),
        isActive: true,
      };
      setSelectedAddtionals((prev) =>
        prev ? [...prev, customAdditional] : [customAdditional]
      );
      setNewAdditionalName("");
      setNewAdditionalPrice("");
      toast.success("Adicional personalizado criado!");
    }
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

    setLoading(true);

    // Iniciar simulação de progresso
    const progressInterval = simulateLoadingProgress();

    try {
      // Simular delay de criação
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Completar a barra de loading
      clearInterval(progressInterval);
      setLoadingProgress(100);

      // Aguardar um pouco antes de mostrar o sucesso
      setTimeout(() => {
        setLoading(false);
        setShowSuccessModal(true);
        toast.success("Produto criado com sucesso!");

        // Fechar modal de sucesso e navegar após 2 segundos
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/produtos");
        }, 2000);
      }, 500);
    } catch (error: any) {
      clearInterval(progressInterval);
      setLoadingProgress(0);
      setLoading(false);
      console.error("Erro ao criar produto:", error);
      toast.error(
        error.message || "Não foi possível criar o produto. Tente novamente."
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
                  Criando produto...
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

        <form onSubmit={handleSubmit}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            variants={fieldVariants}
          >
            <motion.div variants={fieldVariants}>
              <label className="block mb-2 font-medium text-gray-700">
                Nome*
              </label>
              <motion.input
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition-colors duration-200"
                placeholder="Ex: Pizza Margherita"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
                Categoria*
              </label>
              <div>
                <motion.select
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition-colors duration-200"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  required
                  disabled={loading}
                  whileFocus={{
                    borderColor: "#f97316",
                    boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </motion.select>
                <motion.a
                  onClick={() => navigate("/categorias/novo")}
                  className="flex items-center mt-1 text-orange-500 hover:text-orange-800 font-medium cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className="fas fa-plus-circle mr-1"></i> Nova categoria
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            variants={fieldVariants}
          >
            <motion.div variants={fieldVariants}>
              <label className="block mb-2 font-medium text-gray-700">
                Preço (R$)*
              </label>
              <motion.input
                type="number"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition-colors duration-200"
                placeholder="0,00"
                min="0"
                step="0.01"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
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
                Preço promocional (R$)
              </label>
              <motion.input
                type="number"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition-colors duration-200"
                placeholder="0,00"
                min="0"
                step="0.01"
                value={productDiscountPrice}
                onChange={(e) => setProductDiscountPrice(e.target.value)}
                disabled={loading}
                whileFocus={{
                  borderColor: "#f97316",
                  boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)",
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </motion.div>

          <motion.div className="mb-6" variants={fieldVariants}>
            <label className="block mb-2 font-medium text-gray-700">
              Descrição
            </label>
            <motion.textarea
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 min-h-24 resize-y transition-colors duration-200"
              placeholder="Ex: Molho de tomate, mussarela, manjericão fresco e azeite"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              disabled={loading}
              whileFocus={{
                borderColor: "#f97316",
                boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)",
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            variants={fieldVariants}
          >
            <motion.div variants={fieldVariants}>
              <label className="block mb-2 font-medium text-gray-700">
                Imagem
              </label>
              <motion.div
                className="relative flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded hover:border-orange-500 cursor-pointer transition-colors duration-200"
                whileHover={{ borderColor: "#f97316", scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                />
                <motion.i
                  className="fas fa-cloud-upload-alt text-2xl text-gray-500 mb-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-medium text-gray-700">
                  Clique ou arraste uma imagem
                </span>
                <span className="text-sm text-gray-500">
                  PNG, JPG ou JPEG (Máx. 2MB)
                </span>
              </motion.div>

              <AnimatePresence>
                {productImage && (
                  <motion.div
                    className="mt-4 w-full max-w-xs h-48 rounded overflow-hidden"
                    variants={imageUploadVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <img
                      src={productImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block mb-2 font-medium text-gray-700">
                Ativo
              </label>
              <div className="flex items-center gap-3 mt-2">
                <motion.div
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <SwitchButton
                    checked={productIsActive}
                    onChange={(value) => setProductIsActive(value)}
                  />
                </motion.div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Produtos inativos não aparecem no menu para os clientes.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            variants={fieldVariants}
          >
            <motion.div variants={fieldVariants}>
              <label className="block mb-2 font-medium text-gray-700">
                Adicionais Disponíveis
              </label>
              <motion.div
                className="border border-gray-300 rounded max-h-60 overflow-y-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {adicionais.map((additional, index) => (
                  <motion.div
                    key={additional.id}
                    className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                  >
                    <div>
                      <p className="font-medium text-sm">{additional.name}</p>
                      <p className="text-xs text-gray-500">
                        R$ {additional.price.toFixed(2)}
                      </p>
                    </div>
                    <motion.button
                      type="button"
                      className="text-orange-500 hover:text-orange-700 font-medium"
                      onClick={() => addAdditional(additional.id)}
                      disabled={loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Adicionar
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex gap-3 mb-2">
                  <motion.input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition-colors duration-200"
                    placeholder="Nome do adicional"
                    value={newAdditionalName}
                    onChange={(e) => setNewAdditionalName(e.target.value)}
                    disabled={loading}
                    whileFocus={{
                      borderColor: "#f97316",
                      boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.1)",
                    }}
                  />
                  <motion.input
                    type="number"
                    className="w-32 p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition-colors duration-200"
                    placeholder="Preço"
                    min="0"
                    step="0.01"
                    value={newAdditionalPrice}
                    onChange={(e) => setNewAdditionalPrice(e.target.value)}
                    disabled={loading}
                    whileFocus={{
                      borderColor: "#f97316",
                      boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.1)",
                    }}
                  />
                </div>
                <motion.button
                  type="button"
                  className="text-orange-500 hover:text-orange-700 font-medium flex items-center"
                  onClick={addCustomAdditional}
                  disabled={loading}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-plus-circle mr-1"></i> Novo adicional
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block mb-2 font-medium text-gray-700">
                Adicionais Selecionados
              </label>
              <motion.div
                className="border border-gray-300 rounded max-h-60 overflow-y-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <AnimatePresence>
                  {!selectedAddicionals || selectedAddicionals.length === 0 ? (
                    <motion.div
                      className="p-3 text-gray-500 italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Nenhum adicional selecionado
                    </motion.div>
                  ) : (
                    selectedAddicionals.map((additional, index) => (
                      <motion.div
                        key={additional.id}
                        className="flex justify-between items-center p-3 border-b hover:bg-gray-50 border-gray-200 last:border-b-0"
                        initial={{ opacity: 0, x: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {additional.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            R$ {additional.price.toFixed(2)}
                          </p>
                        </div>
                        <motion.button
                          type="button"
                          className="text-red-500 hover:text-red-700 font-medium"
                          onClick={() => removeAdditional(additional.id)}
                          disabled={loading}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Remover
                        </motion.button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
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
                    Salvar
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
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
            onClick={abortCancel}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full z-10 mx-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
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
                className="flex justify-center gap-16"
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
                  Confirmar
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
                Produto criado com sucesso!
              </motion.h3>

              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                O produto "{productName}" foi adicionado ao seu menu.
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

export default ProductsForm;

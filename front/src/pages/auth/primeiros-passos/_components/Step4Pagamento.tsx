import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step4Props {
  onlinePaymentActive: boolean;
  setOnlinePaymentActive: (value: boolean) => void;
  deliveryPaymentActive: boolean;
  setDeliveryPaymentActive: (value: boolean) => void;

  onlineCredit: boolean;
  setOnlineCredit: (value: boolean) => void;
  onlineDebit: boolean;
  setOnlineDebit: (value: boolean) => void;
  onlinePix: boolean;
  setOnlinePix: (value: boolean) => void;

  deliveryCash: boolean;
  setDeliveryCash: (value: boolean) => void;
  deliveryCredit: boolean;
  setDeliveryCredit: (value: boolean) => void;
  deliveryDebit: boolean;
  setDeliveryDebit: (value: boolean) => void;
  deliveryPix: boolean;
  setDeliveryPix: (value: boolean) => void;

  changeOption: boolean;
  setChangeOption: (value: boolean) => void;
  pixKey: string;
  setPixKey: (value: string) => void;
  pixName: string;
  setPixName: (value: string) => void;
  additionalMessage: string;
  setAdditionalMessage: (value: string) => void;

  currentTheme: { bg: string };
}
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const expandVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const checkboxVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const Step4Pagamentos: FC<Step4Props> = (props) => {
  const {
    onlinePaymentActive,
    setOnlinePaymentActive,
    deliveryPaymentActive,
    setDeliveryPaymentActive,
    onlineCredit,
    setOnlineCredit,
    onlineDebit,
    setOnlineDebit,
    onlinePix,
    setOnlinePix,
    deliveryCash,
    setDeliveryCash,
    deliveryCredit,
    setDeliveryCredit,
    deliveryDebit,
    setDeliveryDebit,
    deliveryPix,
    setDeliveryPix,
    changeOption,
    setChangeOption,
    pixKey,
    setPixKey,
    pixName,
    setPixName,
    additionalMessage,
    setAdditionalMessage,
    currentTheme,
  } = props;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Formas de Pagamento
        </h2>
        <p className="text-gray-600 mb-6">
          Configure como você deseja receber de seus clientes.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* 1. Pagamento Online */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 border border-gray-200 rounded-lg p-5"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                1. Pagamento Online
              </h3>
              <p className="text-gray-600 text-sm">
                Receba via Pix e Cartão diretamente pela plataforma.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => setOnlinePaymentActive(!onlinePaymentActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                onlinePaymentActive ? currentTheme.bg : "bg-gray-300"
              }`}
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
            >
              <motion.span
                className="inline-block h-4 w-4 rounded-full bg-white"
                animate={{
                  x: onlinePaymentActive ? 24 : 4,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>

          <AnimatePresence>
            {onlinePaymentActive && (
              <motion.div
                variants={expandVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <label className="block text-sm font-medium mb-4">
                  Métodos de pagamento online permitidos
                </label>

                <div className="space-y-3">
                  <motion.div
                    variants={checkboxVariants}
                    className="flex items-center space-x-3"
                  >
                    <motion.input
                      type="checkbox"
                      checked={onlineCredit}
                      onChange={(e) => setOnlineCredit(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      whileTap={{ scale: 0.9 }}
                    />
                    <i className="fas fa-credit-card text-blue-500"></i>
                    <span>Cartão de Crédito</span>
                  </motion.div>

                  <motion.div
                    variants={checkboxVariants}
                    className="flex items-center space-x-3"
                  >
                    <motion.input
                      type="checkbox"
                      checked={onlineDebit}
                      onChange={(e) => setOnlineDebit(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      whileTap={{ scale: 0.9 }}
                    />
                    <i className="fas fa-credit-card text-green-500"></i>
                    <span>Cartão de Débito</span>
                  </motion.div>

                  <motion.div
                    variants={checkboxVariants}
                    className="flex items-center space-x-3"
                  >
                    <motion.input
                      type="checkbox"
                      checked={onlinePix}
                      onChange={(e) => setOnlinePix(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      whileTap={{ scale: 0.9 }}
                    />
                    <i className="fas fa-qrcode text-purple-500"></i>
                    <span>Pix Online</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 2. Pagamento na Entrega */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 border border-gray-200 rounded-lg p-5"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 flex items-center">
                2. Pagamento na Entrega
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                  Obrigatório
                </span>
              </h3>
              <p className="text-gray-600 text-sm">
                Opções que o entregador pode aceitar no ato da entrega.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => setDeliveryPaymentActive(!deliveryPaymentActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                deliveryPaymentActive ? currentTheme.bg : "bg-gray-300"
              }`}
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
            >
              <motion.span
                className="inline-block h-4 w-4 rounded-full bg-white"
                animate={{
                  x: deliveryPaymentActive ? 24 : 4,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>

          <AnimatePresence>
            {deliveryPaymentActive && (
              <motion.div
                variants={expandVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <label className="block text-sm font-medium mb-4">
                  Métodos aceitos na entrega
                </label>

                <div className="space-y-3 mb-5">
                  <motion.label
                    variants={checkboxVariants}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.input
                      type="checkbox"
                      checked={deliveryCash}
                      onChange={(e) => setDeliveryCash(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      whileTap={{ scale: 0.9 }}
                    />
                    <i className="fas fa-money-bill-wave text-green-500"></i>
                    <span>Dinheiro</span>
                  </motion.label>

                  <motion.label
                    variants={checkboxVariants}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={deliveryCredit}
                      onChange={(e) => setDeliveryCredit(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <i className="fas fa-credit-card text-blue-500"></i>
                    <span>Cartão de Crédito</span>
                  </motion.label>
                  <motion.label
                    variants={checkboxVariants}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={deliveryDebit}
                      onChange={(e) => setDeliveryDebit(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <i className="fas fa-credit-card text-blue-500"></i>
                    <span>Cartão de Débito</span>
                  </motion.label>

                  <motion.label
                    variants={checkboxVariants}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.input
                      type="checkbox"
                      checked={deliveryPix}
                      onChange={(e) => setDeliveryPix(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      whileTap={{ scale: 0.9 }}
                    />
                    <i className="fas fa-qrcode text-purple-500"></i>
                    <span>Pix na Entrega</span>
                  </motion.label>
                </div>

                <motion.div
                  variants={checkboxVariants}
                  className="flex items-center gap-2"
                >
                  <motion.input
                    type="checkbox"
                    id="change-option"
                    checked={changeOption}
                    onChange={(e) => setChangeOption(e.target.checked)}
                    className="h-4 w-4 text-orange-500 border-gray-300 rounded"
                    whileTap={{ scale: 0.9 }}
                  />
                  <label htmlFor="change-option" className="flex items-center">
                    Solicita troco?
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                      Obrigatório
                    </span>
                  </label>
                </motion.div>
                <motion.p
                  variants={checkboxVariants}
                  className="text-xs text-gray-500 mt-2"
                >
                  Se habilitado, o cliente poderá informar o valor para troco
                  quando escolher pagamento em dinheiro
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 3. Configurações de Pix */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 border border-gray-200 rounded-lg p-5"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-2 text-orange-700 font-semibold mb-3">
            <i className="fas fa-qrcode"></i>
            3. Configurações de Pix
          </div>
          <p className="text-gray-600 text-sm mb-5">
            Configurações necessárias para receber pagamentos via Pix (tanto
            online quanto na entrega)
          </p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <label
                htmlFor="pix-key"
                className="block text-sm font-medium mb-2"
              >
                Chave Pix
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                  Obrigatório
                </span>
              </label>
              <motion.input
                type="text"
                id="pix-key"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                placeholder="CPF, CNPJ, telefone, email ou chave aleatória"
                className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="pix-name"
                className="block text-sm font-medium mb-2"
              >
                Nome do favorecido
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                  Obrigatório
                </span>
              </label>
              <motion.input
                type="text"
                id="pix-name"
                value={pixName}
                onChange={(e) => setPixName(e.target.value)}
                placeholder="Nome ou razão social"
                className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 4. Instruções Adicionais */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 border border-gray-200 rounded-lg p-5"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h4 className="text-lg font-semibold mb-2">
            4. Instruções Adicionais
          </h4>
          <div>
            <label
              htmlFor="additional-message"
              className="block text-sm font-medium mb-2"
            >
              Instrução adicional
              <span className="bg-yellow-500 text-gray-800 text-xs px-2 py-1 rounded-full ml-2">
                Opcional
              </span>
            </label>
            <motion.textarea
              id="additional-message"
              value={additionalMessage}
              onChange={(e) => setAdditionalMessage(e.target.value)}
              rows={3}
              placeholder="Mensagem adicional sobre pagamentos que será exibida no checkout (opcional)"
              className="w-full p-2 border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Step4Pagamentos;

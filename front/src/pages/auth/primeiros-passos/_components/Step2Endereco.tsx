import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StateSelector from "../../../../components/shared/StateSelector";

interface Step2Props {
  address: string;
  setAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  cep: string;
  setCep: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  errors: {
    address?: string;
    city?: string;
    state?: string;
    cep?: string;
  };
  currentTheme: { ring: string };
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const errorVariants = {
  hidden: { opacity: 0, y: -10, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    height: 0,
    transition: { duration: 0.2 },
  },
};

const inputFocusVariants = {
  focus: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  blur: {
    scale: 1,
    transition: { duration: 0.2 },
  },
};

const Step2Endereco: FC<Step2Props> = ({
  address,
  setAddress,
  city,
  setCity,
  state,
  setState,
  cep,
  setCep,
  description,
  setDescription,
  errors,
  currentTheme,
}) => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Endereço do Estabelecimento
        </h2>
        <p className="text-gray-600 mb-6">
          Onde os clientes podem te encontrar.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Endereço Completo */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <label className="block text-sm font-medium mb-2">
            Endereço Completo *
          </label>
          <motion.input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua, número e bairro"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.address
                ? "border-red-500 ring-red-500"
                : `border-gray-300 ${currentTheme.ring}`
            }`}
            variants={inputFocusVariants}
            whileFocus="focus"
            animate="blur"
            whileHover={{ scale: 1.01 }}
          />
          <AnimatePresence>
            {errors.address && (
              <motion.p
                className="text-red-500 text-sm mt-1"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {errors.address}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Cidade, Estado e CEP */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-sm font-medium mb-2">Cidade *</label>
            <motion.input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Sua cidade"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.city
                  ? "border-red-500 ring-red-500"
                  : `border-gray-300 ${currentTheme.ring}`
              }`}
              variants={inputFocusVariants}
              whileFocus="focus"
              animate="blur"
              whileHover={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.city && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors.city}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label
              htmlFor="state-selector"
              className="block text-sm font-medium mb-2"
            >
              Estado *
            </label>
            <StateSelector
              value={state}
              onChange={setState}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.state
                  ? "border-red-500 ring-red-500"
                  : `border-gray-300 ${currentTheme.ring}`
              }`}
            />
            <AnimatePresence>
              {errors.state && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors.state}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label htmlFor="cep" className="block text-sm font-medium mb-2">
              CEP *
            </label>
            <motion.input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="00000-000"
              maxLength={9}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.cep
                  ? "border-red-500 ring-red-500"
                  : `border-gray-300 ${currentTheme.ring}`
              }`}
              variants={inputFocusVariants}
              whileFocus="focus"
              animate="blur"
              whileHover={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.cep && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors.cep}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Descrição do Estabelecimento */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Descrição do Estabelecimento
          </label>
          <motion.textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Fale um pouco sobre seu restaurante, suas especialidades, etc."
            rows={3}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-gray-300 ${currentTheme.ring}`}
            variants={inputFocusVariants}
            whileFocus="focus"
            animate="blur"
            whileHover={{ scale: 1.01 }}
          />
          <motion.p
            className="text-xs text-gray-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Esta descrição aparecerá no topo do seu cardápio online.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step2Endereco;

import { ChangeEvent, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step1DadosBasicosProps {
  restaurantName: string;
  setRestaurantName: (value: string) => void;
  logo: string | null;
  handleLogoUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  cnpj: string;
  setCnpj: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  errors: {
    restaurantName?: string;
    cnpj?: string;
    phone?: string;
    email?: string;
  };
  currentTheme: { bg: string; hover: string; ring: string };
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

const logoPreviewVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "backOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
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

const Step1DadosBasicos: FC<Step1DadosBasicosProps> = ({
  restaurantName,
  setRestaurantName,
  logo,
  handleLogoUpload,
  cnpj,
  setCnpj,
  phone,
  setPhone,
  email,
  setEmail,
  errors,
  currentTheme,
}) => {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Dados Básicos do Restaurante
        </h2>
        <p className="text-gray-600 mb-6">
          Vamos começar com as informações essenciais.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Nome do Restaurante */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium mb-2">
            Nome do Restaurante *
          </label>
          <motion.input
            id="restaurantName"
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="Ex: Pizzaria do João"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.restaurantName
                ? "border-red-500 ring-red-500"
                : `border-gray-300 ${currentTheme.ring}`
            }`}
            required
            autoComplete="off"
            variants={inputFocusVariants}
            whileFocus="focus"
            animate="blur"
            whileHover={{ scale: 1.01 }}
          />
          <AnimatePresence>
            {errors.restaurantName && (
              <motion.p
                className="text-red-500 text-sm mt-1"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {errors.restaurantName}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Logo do Restaurante */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium mb-2">
            Logo do Restaurante
          </label>
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AnimatePresence mode="wait">
                {logo ? (
                  <motion.img
                    key="logo-image"
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-cover rounded-lg"
                    variants={logoPreviewVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  />
                ) : (
                  <motion.i
                    key="logo-placeholder"
                    className="fas fa-image text-gray-400 text-2xl"
                    variants={logoPreviewVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <motion.label
                htmlFor="logo-upload"
                className={`cursor-pointer ${currentTheme.bg} ${currentTheme.hover} text-white px-4 py-2 rounded-lg transition-colors inline-block select-none`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <i className="fas fa-upload mr-2"></i>Escolher Logo
              </motion.label>
              <motion.p
                className="text-xs text-gray-500 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                PNG ou JPG (Máx 2MB)
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* CNPJ e Telefone */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-sm font-medium mb-2">CNPJ *</label>
            <motion.input
              id="cnpj"
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="00.000.000/0000-00"
              maxLength={18}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.cnpj
                  ? "border-red-500 ring-red-500"
                  : `border-gray-300 ${currentTheme.ring}`
              }`}
              required
              autoComplete="off"
              variants={inputFocusVariants}
              whileFocus="focus"
              animate="blur"
              whileHover={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.cnpj && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors.cnpj}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-sm font-medium mb-2">Telefone *</label>
            <motion.input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(83) 99999-9999"
              maxLength={15}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.phone
                  ? "border-red-500 ring-red-500"
                  : `border-gray-300 ${currentTheme.ring}`
              }`}
              required
              autoComplete="off"
              variants={inputFocusVariants}
              whileFocus="focus"
              animate="blur"
              whileHover={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Email */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <label className="block text-sm font-medium mb-2">Email *</label>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contato@seu-restaurante.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.email
                ? "border-red-500 ring-red-500"
                : `border-gray-300 ${currentTheme.ring}`
            }`}
            variants={inputFocusVariants}
            whileFocus="focus"
            animate="blur"
            whileHover={{ scale: 1.01 }}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                className="text-red-500 text-sm mt-1"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1DadosBasicos;

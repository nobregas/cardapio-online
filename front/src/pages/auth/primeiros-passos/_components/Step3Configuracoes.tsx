import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DayOfWeek {
  key: string;
  label: string;
}

interface ThemeColor {
  bg: string;
  hover: string;
  ring: string;
  border: string;
}

interface ThemeColors {
  [key: string]: ThemeColor;
}

interface Step3Props {
  workingDays: string[];
  toggleWorkingDay: (day: string) => void;
  openTime: string;
  setOpenTime: (value: string) => void;
  closeTime: string;
  setCloseTime: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  theme: string;
  setTheme: (value: string) => void;
  errors: { workingDays?: string };
  currentTheme: ThemeColor;
  daysOfWeek: DayOfWeek[];
  themeColors: ThemeColors;
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

const dayButtonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
  selected: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 },
  },
};

const themeButtonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { type: "spring", stiffness: 400 },
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.1 },
  },
  selected: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 },
  },
};

const Step3Configuracoes: FC<Step3Props> = ({
  workingDays,
  toggleWorkingDay,
  openTime,
  setOpenTime,
  closeTime,
  setCloseTime,
  language,
  setLanguage,
  currency,
  setCurrency,
  theme,
  setTheme,
  errors,
  currentTheme,
  daysOfWeek,
  themeColors,
}) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Configurações Gerais
        </h2>
        <p className="text-gray-600 mb-6">
          Personalize o funcionamento da sua loja.
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Dias de Funcionamento */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium mb-3">
            Dias de Funcionamento *
          </label>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {daysOfWeek.map((day, index) => (
              <motion.button
                key={day.key}
                type="button"
                onClick={() => toggleWorkingDay(day.key)}
                className={`px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-all ${
                  workingDays.includes(day.key)
                    ? `${currentTheme.bg} text-white ${currentTheme.border}`
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
                tabIndex={0}
                variants={dayButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={workingDays.includes(day.key) ? "selected" : "initial"}
                custom={index}
              >
                {day.label}
              </motion.button>
            ))}
          </motion.div>
          <AnimatePresence>
            {errors.workingDays && (
              <motion.p
                className="text-red-500 text-sm mt-2"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {errors.workingDays}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Horários */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-sm font-medium mb-2">
              Horário de Abertura
            </label>
            <motion.input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-gray-300 ${currentTheme.ring}`}
              tabIndex={0}
              variants={inputFocusVariants}
              whileFocus="focus"
              animate="blur"
              whileHover={{ scale: 1.01 }}
            />
          </motion.div>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-sm font-medium mb-2">
              Horário de Fechamento
            </label>
            <motion.input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-gray-300 ${currentTheme.ring}`}
              tabIndex={0}
              variants={inputFocusVariants}
              whileFocus="focus"
              animate="blur"
              whileHover={{ scale: 1.01 }}
            />
          </motion.div>
        </motion.div>

        {/* Configurações Gerais */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-sm font-medium mb-2">Idioma</label>
            <motion.select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-gray-300 ${currentTheme.ring}`}
              variants={inputFocusVariants}
              whileFocus="focus"
              animate="blur"
              whileHover={{ scale: 1.01 }}
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </motion.select>
          </motion.div>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-sm font-medium mb-2">Moeda</label>
            <motion.select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 border-gray-300 ${currentTheme.ring}`}
              variants={inputFocusVariants}
              whileFocus="focus"
              animate="blur"
              whileHover={{ scale: 1.01 }}
            >
              <option value="BRL">Real (R$)</option>
              <option value="USD">Dólar ($)</option>
              <option value="EUR">Euro (€)</option>
            </motion.select>
          </motion.div>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="block text-sm font-medium mb-2">
              Cor do Tema
            </label>
            <motion.div
              className="flex space-x-3 items-center mt-3"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {Object.entries(themeColors).map(([color, classes]) => (
                <motion.button
                  key={color}
                  type="button"
                  onClick={() => setTheme(color)}
                  className={`w-10 h-10 rounded-full ${
                    classes.bg
                  } transition-all duration-200 ${
                    theme === color
                      ? `ring-4 ring-offset-2 ${currentTheme.ring}`
                      : ""
                  }`}
                  aria-label={`Selecionar tema ${color}`}
                  tabIndex={0}
                  variants={themeButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  animate={theme === color ? "selected" : "initial"}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Step3Configuracoes;

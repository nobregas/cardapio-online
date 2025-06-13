import { FC, FormEvent } from "react";
import { motion } from "framer-motion";

interface Step5Props {
  finishSetup: (e: FormEvent) => void;
  restaurantName: string;
  city: string;
  state: string;
  email: string;
  theme: string;
  phone: string;
  workingDays: string[];
  currentTheme: {
    bg: string;
    hover: string;
    ring?: string;
    border?: string;
    text?: string;
  };
  isSubmitting?: boolean;
  error?: string | null;
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
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

const checkIconVariants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "backOut",
      delay: 0.2,
    },
  },
};

const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const summaryItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

const Step5Finalizar: FC<Step5Props> = ({
  finishSetup,
  restaurantName,
  city,
  state,
  email,
  theme,
  phone,
  workingDays,
  currentTheme,
  isSubmitting = false,
  error,
}) => {
  const summaryItems = [
    {
      icon: "fas fa-store",
      label: "Restaurante:",
      value: restaurantName,
    },
    {
      icon: "fas fa-map-marker-alt",
      label: "Cidade:",
      value: `${city}, ${state}`,
    },
    {
      icon: "fas fa-envelope",
      label: "Email:",
      value: email,
    },
    {
      icon: "fas fa-palette",
      label: "Tema:",
      value: <span className="capitalize">{theme}</span>,
    },
    {
      icon: "fas fa-phone",
      label: "Telefone:",
      value: phone,
    },
    {
      icon: "far fa-calendar-alt",
      label: "Dias:",
      value: `${workingDays.length} dias por semana`,
    },
  ];

  return (
    <motion.section
      className="text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Ícone de Check */}
      <motion.div
        className={`w-24 h-24 ${currentTheme.bg} rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-lg`}
        variants={checkIconVariants}
        animate={["visible", "animate"]}
      >
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          <i className="fas fa-check-double"></i>
        </motion.div>
      </motion.div>

      {/* Título */}
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-4"
        variants={itemVariants}
      >
        {isSubmitting ? "Criando seu restaurante..." : "Tudo Pronto!"}
      </motion.h2>

      {/* Descrição */}
      <motion.p className="text-gray-600 text-lg mb-8" variants={itemVariants}>
        {isSubmitting
          ? "Aguarde enquanto configuramos tudo para você..."
          : "Parabéns! Seu restaurante está configurado e pronto para começar a receber pedidos."}
      </motion.p>

      {/* Exibir erro se houver */}
      {error && (
        <motion.div
          className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            <span>{error}</span>
          </div>
        </motion.div>
      )}

      {/* Resumo */}
      <motion.div
        className="bg-gray-50 rounded-lg p-6 mb-8 text-left border border-gray-200"
        variants={itemVariants}
        whileHover={{
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          transition: { duration: 0.2 },
        }}
      >
        <motion.h3
          className="font-bold text-lg mb-4 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Resumo da Configuração
        </motion.h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.9,
              },
            },
          }}
        >
          {summaryItems.map((item, index) => (
            <motion.p
              key={index}
              variants={summaryItemVariants}
              whileHover={{
                x: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <strong>
                <i className={`${item.icon} w-5 text-gray-500`}></i>{" "}
                {item.label}
              </strong>{" "}
              {item.value}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>

      {/* Texto final */}
      {!isSubmitting && (
        <motion.p className="text-gray-600 mb-6" variants={itemVariants}>
          O próximo passo é adicionar seus produtos ao cardápio e começar a
          vender!
        </motion.p>
      )}

      {/* Botão final */}
      <motion.button
        onClick={finishSetup}
        disabled={isSubmitting}
        className={`w-full md:w-auto px-8 py-4 text-lg font-bold ${currentTheme.bg} ${currentTheme.hover} text-white rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        variants={buttonVariants}
        initial="initial"
        whileHover={!isSubmitting ? "hover" : "initial"}
        whileTap={!isSubmitting ? "tap" : "initial"}
        whileInView={
          !isSubmitting
            ? {
                boxShadow: [
                  "0 4px 8px rgba(0,0,0,0.1)",
                  "0 8px 16px rgba(0,0,0,0.15)",
                  "0 4px 8px rgba(0,0,0,0.1)",
                ],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : {}
        }
      >
        {isSubmitting ? (
          <>
            <motion.i
              className="fas fa-spinner mr-2"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            Criando Restaurante...
          </>
        ) : (
          <>
            <motion.i
              className="fas fa-rocket mr-2"
              animate={{
                rotate: [0, 10, -10, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
            Ir para o Dashboard
          </>
        )}
      </motion.button>

      {isSubmitting && (
        <motion.p
          className="text-sm text-gray-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Aguarde, estamos configurando seu restaurante...
        </motion.p>
      )}
    </motion.section>
  );
};

export default Step5Finalizar;

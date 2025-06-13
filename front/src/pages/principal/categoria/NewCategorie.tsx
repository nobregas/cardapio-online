import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTitle from "../../../components/ui/PageTitle";
import { ArrowLeftIcon } from "lucide-react";
import CategoryForm from "./_components/CategoryForm";

const NewCategoryPage = () => {
  // Variantes de animação para a página
  const pageVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  // Variantes para elementos filhos
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible">
      {/* Page Header */}
      <motion.div className="mb-6" variants={childVariants}>
        <div>
          <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
            <Link
              className="text-gray-400 hover:text-gray-600 flex items-center transition-colors duration-300 ease-in-out mb-2 font-normal"
              to="/categorias"
            >
              <motion.div whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
              </motion.div>
              Voltar para Categorias
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PageTitle title="Adicionar Nova Categoria" />
          </motion.div>
        </div>
      </motion.div>

      {/* Formulário de Adição de Categoria */}
      <motion.div variants={childVariants}>
        <CategoryForm />
      </motion.div>
    </motion.div>
  );
};

export default NewCategoryPage;

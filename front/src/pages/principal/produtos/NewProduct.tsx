import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTitle from "../../../components/ui/PageTitle";
import { ArrowLeftIcon } from "lucide-react";
import ProductsForm from "./_components/ProductsForm";

const NewProductPage = () => {
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
              to="/produtos"
            >
              <motion.div whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
              </motion.div>
              Voltar
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PageTitle title="Adicionar Novo Produto" />
          </motion.div>
        </div>
      </motion.div>

      {/* Formulário de Adição de Produto */}
      <motion.div variants={childVariants}>
        <ProductsForm />
      </motion.div>
    </motion.div>
  );
};

export default NewProductPage;

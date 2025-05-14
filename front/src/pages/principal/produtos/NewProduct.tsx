import { Link } from "react-router-dom";
import PageTitle from "../../../components/ui/PageTitle";
import { ArrowLeftIcon } from "lucide-react";
import ProductsForm from "./_components/ProductsForm";

const NewProductPage = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <div>
          <Link
            className="text-gray-400 hover:text-gray-600 flex items-center transition-colors duration-300 ease-in-out mb-2 font-normal"
            to="/produtos"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Voltar para Produtos
          </Link>
          <PageTitle title="Adicionar Novo Produto" />
        </div>
      </div>

      {/* Formulário de Adição de Produto */}
      <ProductsForm />
    </div>
  );
};

export default NewProductPage;

import React from "react";
import ProductsTable from "../../components/product/ProductsTable";
import { products } from "../../data/mockData";
import PageTitle from "../../components/ui/PageTitle";
import Button from "../../components/ui/Button";
import ActionButtons from "../../components/shared/table/ActionButtons";

const Products = () => {
  return (
    <div>
      <PageTitle title={"Gerenciar Produtos"} />

      {/* Botoes */}
      <div>
        <div>Buscar Produtos</div>
        <Button variant={"primary"} size={"md"}>
          Adicionar Produto
        </Button>
      </div>

      {/* Tabela de Produtos */}
      <ProductsTable products={products} title={"Produtos"} path={""} />
    </div>
  );
};

export default Products;

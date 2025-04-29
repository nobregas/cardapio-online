import React from "react";
import GenericTable from "../shared/table/GenericTable";
import { Product } from "../../types";

interface ProductsTableProps {
  products: Product[];
  title: string;
  path: string;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  title,
  path,
}) => {
  const handleToggle = (item: Product) => {
    console.log(item);
  };

  // Definição das colunas para a tabela de produtos
  const productColumns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Nome" },
    { key: "category", header: "Categoria" },
    { key: "price", header: "Preço" },
    {
      key: "status",
      header: "Status",
      toggleField: true,
      onToggle: (item: Product) => {
        handleToggle(item);
      },
    },
    { key: "lastUpdated", header: "Atualizado em" },
  ];

  return (
    <GenericTable
      items={products}
      columns={productColumns}
      title={title}
      viewAllPath={"/products"}
      viewAllText=""
      emptyMessage="Nenhum produto encontrado."
      statusField="status"
    />
  );
};

export default ProductsTable;

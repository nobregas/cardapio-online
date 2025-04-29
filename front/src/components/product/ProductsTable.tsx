import React, { useState } from "react";
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
  const handleToggle = (checked: boolean) => {
    console.log(checked);
  };

  const [page, setPage] = useState(1);

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
      onToggle: (checked: boolean) => {
        handleToggle(checked);
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
      pagination={
        {
          currentPage: page,
          totalPages: 5,
          onPageChange: (newPage: number) => {
            setPage(newPage);
          },
        }
      }
    />
  );
};

export default ProductsTable;

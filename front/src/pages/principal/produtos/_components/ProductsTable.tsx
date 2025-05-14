import React, { useState } from "react";
import GenericTable from "../../../../components/shared/table/GenericTable";
import { Product } from "../../../../types";

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
    { key: "image", header: "Imagem", image: { isImageColumn: true } },
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
    { key: "actions", header: "Ações", isActionColumn: true },
  ];

  return (
    <GenericTable
      items={products}
      columns={productColumns}
      title={title}
      viewAllPath={path}
      viewAllText=""
      emptyMessage="Nenhum produto encontrado."
      statusField="status"
      pagination={{
        currentPage: page,
        totalPages: 5,
        onPageChange: (newPage: number) => {
          setPage(newPage);
        },
      }}
      rowActions={{
        delete: {
          hasDelete: true,
          onDelete: (item) => {
            console.log("Deletar produto:", item);
          },
          itemName: "produto",
        },
        edit: {
          hasEdit: true,
          onEdit: (item) => {
            console.log("Editar produto:", item);
          },
        },
      }}
    />
  );
};

export default ProductsTable;
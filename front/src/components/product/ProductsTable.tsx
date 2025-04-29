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
  // Configurações de status para produtos
  const productStatusConfigs = {
    ativo: {
      value: "ativo",
      displayText: "Ativo",
      className: "bg-green-100 text-green-600",
    },
    inativo: {
      value: "inativo",
      displayText: "Inativo",
      className: "bg-gray-100 text-gray-600",
    },
    promocao: {
      value: "promocao",
      displayText: "Em Promoção",
      className: "bg-blue-100 text-blue-600",
    },
  };

  // Definição das colunas para a tabela de produtos
  const productColumns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Nome" },
    { key: "category", header: "Categoria" },
    { key: "price", header: "Preço" },
    { key: "status", header: "Status" },
    { key: "lastUpdated", header: "Atualizado em" },
  ];

  return (
    <GenericTable
      items={products}
      columns={productColumns}
      title={title}
      viewAllPath={path}
      emptyMessage="Nenhum produto encontrado."
      statusConfig={productStatusConfigs}
      statusField="status"
    />
  );
};

export default ProductsTable;

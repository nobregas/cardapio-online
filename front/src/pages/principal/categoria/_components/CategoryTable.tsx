import { useState } from "react";
import GenericTable from "../../../../components/shared/table/GenericTable";
import { Category } from "../../../../types";


interface CategoryTableProps {
  categories: Category[];
  title: string;
  path: string;
}

const CategoryTable = ({ categories, title, path }: CategoryTableProps) => {
  const [page, setPage] = useState(1);

  const statusConfigs = {
    true: {
      value: true,
      displayText: "Ativo",
      className: "bg-green-100 text-green-600",
    },
    false: {
      value: false,
      displayText: "Inativo",
      className: "bg-gray-100 text-gray-600",
    },
  };

  const categoryColumns = [
    { key: "image", header: "Imagem", image: { isImageColumn: true } },
    { key: "name", header: "Nome" },
    { key: "description", header: "Descrição" },
    { key: "products", header: "Produtos", 
      render: (category: Category) => `${category.products} ${category.products === 1 ? "produto" : "produtos"}` },
    { key: "isActive", header: "Status" },
    { key: "order", header: "Ordem" },
    { key: "actions", header: "Ações", isActionColumn: true },
  ];

  return (
    <GenericTable
      items={categories}
      columns={categoryColumns}
      title={title}
      viewAllPath={path}
      viewAllText=""
      emptyMessage="Nenhuma categoria encontrada."
      statusField="isActive"
      statusConfig={statusConfigs}
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
            console.log("Deletar categoria:", item);
          },
          itemName: "categoria",
        },
        edit: {
          hasEdit: true,
          onEdit: (item) => {
            console.log("Editar categoria:", item);
          },
        },
        visualize: {
          hasView: true,
          onView: (item) => {
            console.log("Visualizar categoria:", item);
          },
        },
      }}
    />
  );
};

export default CategoryTable;

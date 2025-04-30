import { useState } from "react";
import { Category } from "../../types";
import GenericTable from "../shared/table/GenericTable";

interface CategoryTableProps {
  categories: Category[];
  title: string;
  path: string;
}

const CategoryTable = ({ categories, title, path }: CategoryTableProps) => {
  const [page, setPage] = useState(1);

  const categoryColumns = [
    { key: "image", header: "Imagem", image: { isImageColumn: true } },
    { key: "name", header: "Nome" },
    { key: "description", header: "Descrição" },
    { key: "produtos", header: "Produtos" },
    { key: "isActive", header: "Status",},
    { key: "order", header: "Ordem", isActionColumn: true },
    { key: "actions", header: "Ações", isActionColumn: true },
  ];

  return (
    <GenericTable
      items={categories}
      columns={categoryColumns}
      title={title}
      viewAllPath={path}
      viewAllText=""
      emptyMessage="Nenhuma categoria encontrado."
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
            console.log("Deletar Categoria:", item);
          },
          itemName: "categoria",
        },
        edit: {
          hasEdit: true,
          onEdit: (item) => {
            console.log("Editar categoria:", item);
          },
        },
      }}
    />
  );
};

export default CategoryTable;

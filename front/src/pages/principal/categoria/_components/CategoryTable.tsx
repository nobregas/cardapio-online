import { useState } from "react";
import GenericTable from "../../../../components/shared/table/GenericTable";
import { ICategory } from "../../../../types";
import { useCategories } from "../../../../hooks/useCategory";

interface CategoryTableProps {
  title: string;
  path: string;
}

const CategoryTable = ({ title, path }: CategoryTableProps) => {
  const [page, setPage] = useState(1);
  const { categories, loading, error, removeCategory } = useCategories();

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

  // Transformar ICategory para o formato esperado pela GenericTable
  const transformedCategories = categories.map((category) => ({
    ...category,
    id: category._id, // Mapear _id para id
    products: 0, // Como ICategory não tem products, definimos como 0 ou busque de outra fonte
  }));

  const categoryColumns = [
    { key: "image", header: "Imagem", image: { isImageColumn: true } },
    { key: "name", header: "Nome" },
    { key: "description", header: "Descrição" },
    {
      key: "products",
      header: "Produtos",
      render: (category: ICategory & { products: number }) =>
        `${category.products} ${
          category.products === 1 ? "produto" : "produtos"
        }`,
    },
    { key: "isActive", header: "Status" },
    { key: "order", header: "Ordem" },
    { key: "actions", header: "Ações", isActionColumn: true },
  ];

  const handleDelete = async (item: ICategory & { id: string }) => {
    try {
      await removeCategory(item._id);
      console.log("Categoria deletada:", item);
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  };

  const handleEdit = (item: ICategory & { id: string }) => {
    // Implementar navegação para página de edição ou abrir modal
    console.log("Editar categoria:", item);
  };

  const handleView = (item: ICategory & { id: string }) => {
    // Implementar visualização da categoria
    console.log("Visualizar categoria:", item);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Carregando categorias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <p>Erro ao carregar categorias: {error.message}</p>
      </div>
    );
  }

  return (
    <GenericTable
      items={transformedCategories}
      columns={categoryColumns}
      title={title}
      viewAllPath={path}
      viewAllText=""
      emptyMessage="Nenhuma categoria encontrada."
      statusField="isActive"
      statusConfig={statusConfigs}
      pagination={{
        currentPage: page,
        totalPages: Math.ceil(categories.length / 10), // Ajustar conforme sua lógica de paginação
        onPageChange: (newPage: number) => {
          setPage(newPage);
        },
      }}
      rowActions={{
        delete: {
          hasDelete: true,
          onDelete: handleDelete,
          itemName: "categoria",
        },
        edit: {
          hasEdit: true,
          onEdit: handleEdit,
        },
        visualize: {
          hasView: true,
          onView: handleView,
        },
      }}
    />
  );
};

export default CategoryTable;

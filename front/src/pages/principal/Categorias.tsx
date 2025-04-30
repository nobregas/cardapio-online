import CategoryTable from '../../components/category/CategoryTable';
import PageHeader from '../../components/shared/PageHeader';
import { categories } from '../../data/mockData';

const Categorias = () => {
  const handleAddProduct = (): void => {
    // Lógica para abrir modal ou navegar para página de adição
    console.log("Add category clicked");
  }

  const handleSearch = (query: string): void => {
    //setSearchQuery(query);
    // Aqui você implementaria a lógica de busca
    console.log("Searching for:", query);
  }

  const filters = [
    {
      label: "Status",
      options: [
        { value: "1", label: "Ativos" },
        { value: "2", label: "Inativos" }
      ],
      onChange: (value: string): void => {
        //setStatusFilter(value);
        console.log("Status filter changed:", value);
      }
    }
  ];

  return (
    <div>
      <PageHeader 
        title={"Gerenciar Categorias"}
        searchPlaceholder={`Buscar Categorias...`}
        onAddClick={handleAddProduct}
        addButtonLabel={"Adicionar Categoria"}
        onSearch={handleSearch}
        filters={filters}
      />

      {/* Tabela de Categorias */}
      <CategoryTable categories={categories} title={"Categorias"} path={"/categorias"} />
    </div>
  )
}

export default Categorias
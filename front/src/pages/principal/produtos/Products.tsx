//import  { useState } from "react";
import ProductsTable from "./_components/ProductsTable";
import { products } from "../../../data/mockData";
import PageHeader from "../../../components/layout/PageHeader";
import { useNavigate } from "react-router-dom";

const Products = () => {
  //const [categoryFilter, setCategoryFilter] = useState<string>("");
  //const [statusFilter, setStatusFilter] = useState<string>("");

 // const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  const handleSearch = (query: string): void => {
    //setSearchQuery(query);
    // Aqui você implementaria a lógica de busca
    console.log("Searching for:", query);
  };

  const handleAddProduct = (): void => {
    navigate("/produtos/novo");
  };

  const filters = [
    {
      label: "Todas as categorias",
      options: [
        { value: "1", label: "Pizzas Tradicionais" },
        { value: "2", label: "Pizzas Especiais" },
        { value: "3", label: "Bebidas" },
        { value: "4", label: "Sobremesas" }
      ],
      onChange: (value: string): void => {
        //setCategoryFilter(value);
        console.log("Category filter changed:", value);
      }
    },
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
        title={"Gerenciar Produtos"}
        searchPlaceholder={`Buscar produtos...`}
        onAddClick={handleAddProduct}
        addButtonLabel={"Adicionar Produto"}
        onSearch={handleSearch}
        filters={filters}
      />

      {/* Tabela de Produtos */}
      <ProductsTable products={products} title={"Produtos"} path={"/produtos"} />
    </div>
  );
};

export default Products;

import { useState } from "react";
import PageHeader from "../../../components/layout/PageHeader";

const Adicionais = () => {
  const [currentTab, setCurrentTab] = useState<string>("1");

  const handleAddAdicionais = () => {
    console.log("Adicionar Adicionais");
  };

  const handleSearch = (query: string) => {
    console.log("Buscar Adicionais", query);
  };

  const onTabChange = (tabId: string) => {
    if (tabId !== currentTab) {
      setCurrentTab(tabId);
      console.log("Tab changed to:", tabId);
    } else {
      console.log("Tab already selected:", tabId);
    }
  };

  const tabs = [
    { id: "1", label: "Adicionais" },
    { id: "2", label: "Adicionais Padrão por Categoria" },
  ];

  const filters = [
    {
      label: "Status",
      options: [
        { value: "1", label: "Ativos" },
        { value: "2", label: "Inativos" },
      ],
      onChange: (value: string): void => {
        //setStatusFilter(value);
        console.log("Status filter changed:", value);
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title={"Gerenciar Adicionais"}
        searchPlaceholder={`Buscar Adicionais...`}
        onAddClick={handleAddAdicionais}
        addButtonLabel={"Adicionar Adicionais"}
        onSearch={handleSearch}
        filters={filters}
        tabs={tabs}
        activeTab={currentTab}
        onTabChange={onTabChange}
      />

      {/* Table */}
    </div>
  );
};

export default Adicionais;

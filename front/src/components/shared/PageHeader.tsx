import React, { useState } from "react";
import Button from "../ui/Button";
import SearchBar from "../ui/SearchBar";
import SelectInput from "../ui/Select";
import PageTitle from "../ui/PageTitle";

interface FilterOption {
  value: string;
  label: string;
}

interface Filter {
  label: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

interface Tab {
  id: string;
  label: string;
}

interface PageHeaderProps {
  title: string;
  onAddClick?: () => void;
  onSearch?: (query: string) => void;
  filters?: Filter[];
  searchPlaceholder?: string;
  addButtonLabel?: string;
  tabs?: Tab[];
  onTabChange?: (tabId: string) => void;
  activeTab?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  onAddClick, 
  onSearch, 
  filters = [],
  searchPlaceholder = "Buscar...",
  addButtonLabel = "Adicionar",
  tabs = [],
  activeTab,
  onTabChange
}) => {

  const [currentTab, setCurrentTab] = useState<string>(activeTab || (tabs.length > 0 ? tabs[0].id : ''));

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  }


  return (
    <div className="mb-6">
      {/* Título e botão de adicionar */}
      <div className="flex justify-between items-center mb-4">
        <PageTitle title={title} />
        <Button variant={"primary"} size={"lg"} onClick={onAddClick}>
          {addButtonLabel}
        </Button>
      </div>

      {/* Abas de navegação */}
      {tabs.length > 0 && (
        <div className="border-b border-gray-300 mb-6">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  currentTab === tab.id
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Barra de pesquisa e filtros */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-full md:w-96">
          <SearchBar 
            placeholder={searchPlaceholder} 
            onSearch={onSearch}
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          {filters.map((filter, index) => (
            <SelectInput
              key={index}
              options={filter.options}
              defaultLabel={filter.label}
              onChange={filter.onChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
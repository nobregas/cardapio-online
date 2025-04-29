import React from "react";
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

interface PageHeaderProps {
  title: string;
  onAddClick?: () => void;
  onSearch?: (query: string) => void;
  filters?: Filter[];
  searchPlaceholder?: string;
  addButtonLabel?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  onAddClick, 
  onSearch, 
  filters = [],
  searchPlaceholder = "Buscar...",
  addButtonLabel = "Adicionar"
}) => {
  return (
    <div className="mb-6">
      {/* Título e botão de adicionar */}
      <div className="flex justify-between items-center mb-4">
        <PageTitle title={title} />
        <Button variant={"primary"} size={"lg"} onClick={onAddClick}>
          {addButtonLabel}
        </Button>
      </div>

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
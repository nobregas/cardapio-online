import React, { useState, useRef, useEffect } from "react";
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
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  
  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  // Atualiza a posição e largura do indicador quando a aba atual muda
  useEffect(() => {
    const setIndicatorPosition = () => {
      const currentTabIndex = tabs.findIndex(tab => tab.id === currentTab);
      if (currentTabIndex !== -1 && tabsRef.current[currentTabIndex]) {
        const tabElement = tabsRef.current[currentTabIndex];
        if (tabElement) {
          setIndicatorStyle({
            left: tabElement.offsetLeft,
            width: tabElement.offsetWidth
          });
        }
      }
    };

    setIndicatorPosition();
    
    // Para garantir que funcione após alterações de layout
    window.addEventListener('resize', setIndicatorPosition);
    return () => {
      window.removeEventListener('resize', setIndicatorPosition);
    };
  }, [currentTab, tabs]);
  
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
        <div className="mb-6 relative">
          <nav className="flex border-b border-gray-300">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={el => { tabsRef.current[index] = el }}
                onClick={() => handleTabChange(tab.id)}
                className={`py-4 px-4 font-medium text-sm transition-colors duration-300 ${
                  currentTab === tab.id
                    ? 'text-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
            {/* Indicador deslizante */}
            <div 
              className="absolute bottom-0 h-0.5 bg-orange-500 transition-all duration-300 ease-in-out"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`
              }}
            />
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
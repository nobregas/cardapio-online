import React, { FormEvent } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Buscar...", onSearch }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchInput = form.elements.namedItem('search') as HTMLInputElement;
    const query = searchInput.value;
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
        <input
          type="text"
          name="search"
          placeholder={placeholder}
          className="w-full py-2 px-4 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

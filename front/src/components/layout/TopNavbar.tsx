import React, { useState } from "react";
import { Link } from "react-router-dom";

interface TopNavbarProps {
  toggleSidebar: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-white py-4 px-5 flex justify-between items-center shadow-sm">
      <button
        onClick={toggleSidebar}
        className="text-2xl text-gray-800 bg-transparent border-none cursor-pointer"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className="relative">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold mr-3">
            B
          </div>
          <button
            className="flex items-center text-gray-800 bg-transparent border-none cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>Administrador</span>
            {dropdownOpen ? (
              <i className="fas fa-chevron-up ml-4 mr-3"></i>
            ) : (
              <i className="fas fa-chevron-down ml-4 mr-3"></i>
            )}
          </button>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <Link
              to="/perfil"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Perfil
            </Link>
            <Link
              to="/configuracoes"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Configurações
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => console.log("Logout")}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;

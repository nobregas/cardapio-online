import React, { useState } from "react";

const TrashIcon = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDeleteItem = () => {
    // Lógica para excluir o item
    return;
  };

  return (
    <button
      onClick={handleDeleteItem}
      className="text-red-500 hover:text-red-700"
    >
      <i className="fas fa-trash"></i>
    </button>
  );
};

export default TrashIcon;

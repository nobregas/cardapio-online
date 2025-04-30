import  { useState } from 'react';
import { Pen, Trash, AlertTriangle } from 'lucide-react';

interface ActionButtonsProps {
  delete?: {
    hasDelete: boolean;
    onDelete: (item: any) => void;
    itemName?: string;
  };
  edit?: {
    hasEdit: boolean;
    onEdit: (item: any) => void;
  };
  item: any;
}

const ActionButtons = ({ delete: deleteAction, edit, item }: ActionButtonsProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };
  
  const handleConfirmDelete = () => {
    if (deleteAction && deleteAction.onDelete) {
      deleteAction.onDelete(item);
    }
    setShowConfirmation(false);
  };
  
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  
  const itemName = deleteAction?.itemName || "este item";
  
  return (
    <div className="flex gap-2 relative">
      {/* Edit button */}
      {edit && edit.hasEdit && (
        <button 
          onClick={() => edit.onEdit(item)}
          className="w-8 h-8 flex items-center justify-center rounded bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-all duration-300"
          title="Editar"
        >
          <Pen size={16} />
        </button>
      )}
      
      {/* Delete button */}
      {deleteAction && deleteAction.hasDelete && (
        <button 
          onClick={handleDeleteClick}
          className="w-8 h-8 flex items-center justify-center rounded bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all duration-300"
          title="Excluir"
        >
          <Trash size={16} />
        </button>
      )}
      
      {/* Confirmation modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={handleCancelDelete}
          ></div>
          
          {/* Confirmation dialog */}
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 z-10">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <AlertTriangle className="text-red-500" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Confirmar exclusão</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir {itemName}? Essa ação não pode ser desfeita.
            </p>
            
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
import React from "react";
import { Link } from "react-router-dom";
import SwitchButton from "../../ui/SwitchButton";
import Pagination from "../../ui/Pagination";
import ActionButtons from "./ActionButtons";

interface TableItem {
  id: string | number;
  [key: string]: unknown;
}

interface StatusConfig {
  value: string | boolean;
  displayText: string;
  className: string;
}

interface ColumnConfig<T extends TableItem> {
  key: keyof T | string;
  header: string;
  toggleField?: boolean;
  onToggle?: (checked: boolean) => void;
  render?: (item: T) => React.ReactNode;
  isActionColumn?: boolean;
  image?: {
    isImageColumn?: boolean;
  };
}

interface GenericTableProps<T extends TableItem> {
  items: T[];
  columns: ColumnConfig<T>[];
  title: string;
  emptyMessage?: string;
  viewAllPath?: string;
  viewAllText?: string;
  statusConfig?: Record<string, StatusConfig>;
  statusField?: keyof T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  rowActions?: {
    delete?: {
      hasDelete: boolean;
      onDelete: (item: T) => void;
      itemName?: string;
    };
    edit?: {
      hasEdit: boolean;
      onEdit: (item: T) => void;
    };
  };
}

function GenericTable<T extends TableItem>({
  items,
  columns,
  title,
  emptyMessage = "Nenhum item encontrado",
  viewAllPath,
  viewAllText = "Ver todos",
  statusConfig,
  statusField,
  pagination,
  rowActions,
}: GenericTableProps<T>) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const renderCell = (item: T, column: ColumnConfig<T>) => {
    // se for um campo de status
    if (statusField && column.key === statusField && statusConfig) {
      const statusValue = String(item[statusField]);
      const config = statusConfig[statusValue];

      if (config) {
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}
          >
            {config.displayText}
          </span>
        );
      }
    }

    if (column.toggleField && column.onToggle) {
      const key = column.key as string;
      const isActive = Boolean(item[key]);

      return <SwitchButton checked={isActive} onChange={column.onToggle} />;
    }

    if (column.isActionColumn) {
      return (
        <ActionButtons
          delete={rowActions?.delete}
          edit={rowActions?.edit}
          item={item}
        />
      );
    }

    if (column.image?.isImageColumn) {
      return (
        <img
          src={item.image as string}
          alt="Imagem"
          className="h-15 w-15 object-cover"
        />
      );
    }

    // se a coluna tiver um render persolnalizado
    if (column.render) {
      return column.render(item);
    }

    // padrao
    const key = column.key as string;
    return String(item[key]);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-5 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          {viewAllPath && (
            <Link to={viewAllPath} className="text-orange-500 font-medium">
              {viewAllText}
            </Link>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                {columns.map((column) => (
                  <th
                    key={column.key as string}
                    className="px-5 py-4 font-medium"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  {columns.map((column) => (
                    <td
                      key={`${item.id}-${column.key as string}`}
                      className="px-5 py-4"
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </>
  );
}

export default GenericTable;

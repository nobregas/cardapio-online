import React from "react";
import { Link } from "react-router-dom";

interface TableItem {
  id: string | number;
  [key: string]: unknown;
}

interface StatusConfig {
  value: string;
  displayText: string;
  className: string;
}

interface ColumnConfig<T extends TableItem> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
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

    // se a coluna tiver um render persolnalizado
    if (column.render) {
      return column.render(item);
    }

    // padrao
    const key = column.key as string;
    return String(item[key]);
  };

  return (
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
  );
}

export default GenericTable;

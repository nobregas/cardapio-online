import { useState } from "react";
import GenericTable from "../../../../components/shared/table/GenericTable";
import { Order } from "../../../../types";
import { orderStatusConfigs } from "../../../../utils";

interface PedidosTableProps {
  orders: Order[];
  title: string;
  path: string;
}

const PedidosTable = ({ orders, title, path }: PedidosTableProps) => {
  const [page, setPage] = useState(1);

  const ordersColumns = [
    { key: "id", header: "ID" },
    { key: "customer", header: "Cliente" },
    {
      key: "items",
      header: "Itens",
      render: (order: Order) =>
        `${order.items} ${order.items === 1 ? "item" : "itens"}`,
    },
    { key: "total", header: "Total" },
    { key: "status", header: "Status" },
    { key: "date", header: "Data" },
    { key: "actions", header: "Ações", isActionColumn: true },
  ];

  return (
    <GenericTable
      items={orders}
      columns={ordersColumns}
      title={title}
      viewAllPath={path}
      viewAllText=""
      emptyMessage="Nenhum pedido encontrado."
      statusConfig={orderStatusConfigs}
      statusField="status"
      pagination={{
        currentPage: page,
        totalPages: 5,
        onPageChange: (newPage: number) => {
          setPage(newPage);
        },
      }}
      rowActions={{
        delete: {
          hasDelete: true,
          onDelete: (item) => {
            console.log("Deletar pedido:", item);
          },
          itemName: "pedido",
        },
        edit: {
          hasEdit: true,
          onEdit: (item) => {
            console.log("Editar pedido:", item);
          },
        },
        visualize: {
          hasView: true,
          onView: (item) => {
            console.log("Visualizar pedido:", item);
          },
        },
      }}
    />
  );
};

export default PedidosTable;

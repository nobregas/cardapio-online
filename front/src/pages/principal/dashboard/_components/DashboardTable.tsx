import React from "react";
import GenericTable from "../../../../components/shared/table/GenericTable";
import { Order } from "../../../../types";
import { orderStatusConfigs } from "../../../../utils";


interface OrdersTableProps {
  orders: Order[];
  title: string;
  path: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, title, path }) => {
  
  // Definição das colunas para a tabela de pedidos
  const orderColumns = [
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
  ];

  return (
    <GenericTable
      items={orders}
      columns={orderColumns}
      title={title}
      viewAllPath={path}
      emptyMessage="Nenhum pedido encontrado."
      statusConfig={orderStatusConfigs}
      statusField="status"
    />
  );
};

export default OrdersTable;

import React from "react";
import GenericTable from "../../../../components/shared/table/GenericTable";
import { Order } from "../../../../types";


interface OrdersTableProps {
  orders: Order[];
  title: string;
  path: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, title, path }) => {
  // Configurações de status para pedidos
  const orderStatusConfigs = {
    Concluido: {
      value: "Concluido",
      displayText: "Concluído",
      className: "bg-green-100 text-green-600",
    },
    PagamentoPendente: {
      value: "PagamentoPendente",
      displayText: "Pendente",
      className: "bg-yellow-100 text-yellow-600",
    },
    Cancelado: {
      value: "Cancelado",
      displayText: "Cancelado",
      className: "bg-red-100 text-red-600",
    },
    PagamentoConcluido: {
      value: "PagamentoConcluido",
      displayText: "Pagamento Concluído",
      className: "bg-green-100 text-green-700",
    },
    EmPreparo: {
      value: "EmPreparo",
      displayText: "Em Preparo",
      className: "bg-blue-100 text-blue-600",
    },
    ProntoParaRetirada: {
      value: "ProntoParaRetirada",
      displayText: "Pronto Para Retirada",
      className: "bg-orange-100 text-orange-600",
    },
    EmTransporte: {
      value: "EmTransporte",
      displayText: "Em Transporte",
      className: "bg-purple-100 text-purple-600",
    },
    Entregue: {
      value: "Entregue",
      displayText: "Entregue",
      className: "bg-teal-100 text-teal-600",
    },
  };

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

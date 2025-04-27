import React from "react";
import StatusBadge from "../ui/StatusBadge";
import { Order } from "../../types";

interface OrdersTableProps {
  orders: Order[];
  title: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-8">
      <div className="px-5 py-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <a href="#" className="text-orange-500 font-medium">
          Ver todos
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="px-5 py-4 font-medium">ID</th>
              <th className="px-5 py-4 font-medium">Cliente</th>
              <th className="px-5 py-4 font-medium">Itens</th>
              <th className="px-5 py-4 font-medium">Total</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-5 py-4">{order.id}</td>
                <td className="px-5 py-4">{order.customer}</td>
                <td className="px-5 py-4">
                  {order.items} {order.items === 1 ? "item" : "itens"}
                </td>
                <td className="px-5 py-4">{order.total}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;

import React from "react";
import { Order } from "../../types";
import { Link } from "react-router-dom";

interface OrdersTableProps {
  orders: Order[];
  title: string;
  path: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, title, path }) => {
  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Nenhum pedido encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-5 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">
            {title}
          </h3>
          <Link to={path} className="text-orange-500 font-medium">
            Ver todos
          </Link>
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
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        order.status === "Concluido"
                          ? "bg-green-100 text-green-600"
                          : ""
                      }
                      ${
                        order.status === "PagamentoPendente"
                          ? "bg-yellow-100 text-yellow-600"
                          : ""
                      }
                      ${
                        order.status === "Cancelado"
                          ? "bg-red-100 text-red-600"
                          : ""
                      }
                      ${
                        order.status === "PagamentoConcluido"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }
                      ${
                        order.status === "EmPreparo"
                          ? "bg-blue-100 text-blue-600"
                          : ""
                      }
                      ${
                        order.status === "ProntoParaRetirada"
                          ? "bg-orange-100 text-orange-600"
                          : ""
                      }
                      ${
                        order.status === "EmTransporte"
                          ? "bg-purple-100 text-purple-600"
                          : ""
                      }
                      ${
                        order.status === "Entregue"
                          ? "bg-emerald-100 text-emerald-700"
                          : ""
                      }
                    `}
                    >
                      {order.status === "Concluido" && "Concluído"}
                      {order.status === "PagamentoPendente" && "Pendente"}
                      {order.status === "Cancelado" && "Cancelado"}
                      {order.status === "PagamentoConcluido" && "Pagamento Concluido"}
                      {order.status === "EmPreparo" && "Em Preparo"}
                      {order.status === "ProntoParaRetirada" && "Pronto Para Retirada"}
                      {order.status === "EmTransporte" && "Em Transporte"}
                      {order.status === "Entregue" && "Entregue"}
                    </span>
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

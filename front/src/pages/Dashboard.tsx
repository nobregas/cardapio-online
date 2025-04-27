// src/pages/Dashboard.tsx
import React from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/dashboard/StatCard";
import ChartCard from "../components/dashboard/ChartCard";
import { statCards, recentOrders, popularProducts } from "../data/mockData";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Dashboard</h2>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            color={stat.color}
            value={stat.value}
            title={stat.title}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2">
          <ChartCard
            title="Acessos e Pedidos"
            showPeriodSelector={true}
            chartContent="Gráfico de linhas: Acessos vs Pedidos ao longo do tempo"
          />
        </div>
        <div>
          <ChartCard
            title="Produtos Mais Pedidos"
            chartContent="Gráfico de barras: Top 5 produtos"
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-5 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">
            Pedidos Recentes
          </h3>
          <Link to="/pedidos" className="text-orange-500 font-medium">
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
              {recentOrders.map((order) => (
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
                    `}
                    >
                      {order.status === "Concluido" && "Concluído"}
                      {order.status === "PagamentoPendente" && "Pendente"}
                      {order.status === "Cancelado" && "Cancelado"}
                    </span>
                  </td>
                  <td className="px-5 py-4">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popular Products */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-medium text-gray-800">
            Produtos Populares
          </h3>
          <Link to="/produtos" className="text-orange-500 font-medium">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div
                className="h-36 w-full bg-gray-200 bg-center bg-cover"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <div className="p-4">
                <div className="font-semibold text-gray-800 mb-1">
                  {product.name}
                </div>
                <div className="text-orange-500 font-medium mb-2">
                  {product.price}
                </div>
                <div className="text-xs text-gray-500">{product.category}</div>

                <div className="flex justify-between mt-3">
                  <Link
                    to={`/produtos/editar/${product.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <i className="fas fa-pen"></i>
                  </Link>
                  <button className="text-red-500 hover:text-red-700">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

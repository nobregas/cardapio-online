import React, { useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/dashboard/StatCard";
import ChartCard from "../components/dashboard/chart/ChartCard";
import { statCards, recentOrders, popularProducts } from "../data/mockData";
import ProductCard from "../components/dashboard/ProductCard";
import OrdersTable from "../components/dashboard/OrdersTable";
import LineChartComponent from "../components/dashboard/chart/LineChartComponent";
import BarChartComponent from "../components/dashboard/chart/BarsChart";

const Dashboard: React.FC = () => {
  const [linePeriod, setLinePeriod] = useState("monthly");

  const handlePeriodChange = (period: string) => {
    setLinePeriod(period);
  };

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
            showPeriodSelector={false}
            chartContent={
              <LineChartComponent
                period={linePeriod}
                onPeriodChange={handlePeriodChange}
              />
            }
          />
        </div>
        <div>
          <ChartCard
            title="Produtos Mais Pedidos"
            chartContent={<BarChartComponent />}
          />
        </div>
      </div>

      {/* Recent Orders */}
      <OrdersTable
        orders={recentOrders}
        title="Pedidos Recentes"
        path="/pedidos"
      />

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
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              discountPrice={product.discountPrice}
              category={product.category}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

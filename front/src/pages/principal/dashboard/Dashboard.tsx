import React, { useState } from "react";
import { Link } from "react-router-dom";
import BarChartComponent from "../../../components/chart/BarsChart";
import ChartCard from "../../../components/chart/ChartCard";
import LineChartComponent from "../../../components/chart/LineChartComponent";
import PageTitle from "../../../components/ui/PageTitle";
import ProductCard from "../../../components/ui/ProductCard";
import StatCard from "../../../components/ui/StatCard";
import { statCards, recentOrders, popularProducts } from "../../../data/mockData";
import DashboardTable from "./_components/DashboardTable";


const Dashboard: React.FC = () => {
  const [linePeriod, setLinePeriod] = useState("monthly");

  const handlePeriodChange = (period: string) => {
    setLinePeriod(period);
  };

  return (
    <div>
      <PageTitle title="Dashboard" />

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
      <DashboardTable
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

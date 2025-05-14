import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { truncate } from "../../utils";

const topProductsData = [
  { name: "Pizza Calabresa", vendas: 420 },
  { name: "Pizza Frango", vendas: 360 },
  { name: "Combo 2 pizza", vendas: 310 },
  { name: "Coca 2L", vendas: 245 },
  { name: "Agua", vendas: 190 },
];

interface BarChartComponentProps {
  data?: Array<{ name: string; vendas: number }>;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data = topProductsData,
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  
  const sortedData = [...data]
  .sort((a, b) => b.vendas - a.vendas)
  .slice(0, 5)
  .map((item) => ({
    ...item,
    displayName: windowWidth < 1800 ? truncate(item.name, 8) : item.name,
  }));
  

  const COLORS = ["#F97316", "#FB923C", "#FDBA74", "#FFD8A8", "#FFF7ED"];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        {isMobile ? (
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 5, left: 70, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              tickFormatter={(value) =>
                value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value
              }
            />
            <YAxis
              dataKey="displayName"
              type="category"
              tick={{ fontSize: 10 }}
              width={70}
            />
            <Tooltip
              formatter={(value) => [`${value} unidades`, "Vendas"]}
              labelFormatter={(value) => {
                const match = sortedData.find(item => item.displayName === value);
                return `${match?.name || value}`;
              }}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "4px",
                border: "1px solid #e0e0e0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="vendas"
              name="Unidades Vendidas"
              radius={[0, 4, 4, 0]}
            >
              {sortedData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <BarChart
            data={sortedData}
            margin={{ top: 30, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="displayName"
              tick={{ fontSize: 12 }}
              height={20}
              interval={0}
            />
            <YAxis
              tickFormatter={(value) =>
                value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value
              }
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`${value} unidades`, "Vendas"]}
              labelFormatter={(value) => {
                const match = sortedData.find(item => item.displayName === value);
                return `${match?.name || value}`;
              }}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "4px",
                border: "1px solid #e0e0e0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: isTablet ? 10 : 12, paddingTop: 10 }}
            />
            <Bar
              dataKey="vendas"
              name="Unidades Vendidas"
              radius={[4, 4, 0, 0]}
            >
              {sortedData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;

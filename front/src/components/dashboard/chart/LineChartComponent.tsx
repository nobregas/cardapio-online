import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend as RechartsLegend
} from 'recharts';

const timeSeriesData = {
  weekly: [
    { name: 'Seg', acessos: 1200, pedidos: 400 },
    { name: 'Ter', acessos: 1400, pedidos: 430 },
    { name: 'Qua', acessos: 1300, pedidos: 448 },
    { name: 'Qui', acessos: 1500, pedidos: 470 },
    { name: 'Sex', acessos: 1800, pedidos: 540 },
    { name: 'Sáb', acessos: 1100, pedidos: 580 },
    { name: 'Dom', acessos: 900, pedidos: 390 },
  ],
  monthly: [
    { name: 'Jan', acessos: 4000, pedidos: 2400 },
    { name: 'Fev', acessos: 3000, pedidos: 1398 },
    { name: 'Mar', acessos: 2000, pedidos: 2800 },
    { name: 'Abr', acessos: 2780, pedidos: 3908 },
    { name: 'Mai', acessos: 1890, pedidos: 4800 },
    { name: 'Jun', acessos: 2390, pedidos: 3800 },
    { name: 'Jul', acessos: 3490, pedidos: 4300 },
    { name: 'Ago', acessos: 3200, pedidos: 4100 },
    { name: 'Set', acessos: 2950, pedidos: 3850 },
    { name: 'Out', acessos: 3100, pedidos: 3950 },
    { name: 'Nov', acessos: 3300, pedidos: 4200 },
    { name: 'Dez', acessos: 3700, pedidos: 4600 },
  ],
  yearly: [
    { name: '2020', acessos: 35000, pedidos: 18000 },
    { name: '2021', acessos: 45000, pedidos: 24000 },
    { name: '2022', acessos: 52000, pedidos: 29000 },
    { name: '2023', acessos: 49000, pedidos: 31000 },
    { name: '2024', acessos: 58000, pedidos: 38000 },
  ]
};

interface LineChartComponentProps {
  period?: string;
  onPeriodChange?: (period: string) => void;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ 
  period = 'monthly',
  onPeriodChange 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(period);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    setSelectedPeriod(period);
  }, [period]);

  const handlePeriodChange = (newPeriod: string) => {
    setSelectedPeriod(newPeriod);
    if (onPeriodChange) {
      onPeriodChange(newPeriod);
    }
  };
  
  const isMobile = windowWidth < 768;
  
  const formatNumber = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (numValue >= 1000000) {
      return `${(numValue / 1000000).toFixed(1)}M`;
    }
    if (numValue >= 1000) {
      return `${(numValue / 1000).toFixed(1)}K`;
    }
    return numValue;
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-end mb-4">
        <div className="inline-flex items-center rounded-md bg-gray-100">
          <button
            onClick={() => handlePeriodChange('weekly')}
            className={`${
              selectedPeriod === 'weekly'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            } px-3 py-1.5 text-xs font-medium rounded-l-md transition-all`}
            type="button"
          >
            Semanal
          </button>
          <button
            onClick={() => handlePeriodChange('monthly')}
            className={`${
              selectedPeriod === 'monthly'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            } px-3 py-1.5 text-xs font-medium transition-all`}
            type="button"
          >
            Mensal
          </button>
          <button
            onClick={() => handlePeriodChange('yearly')}
            className={`${
              selectedPeriod === 'yearly'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            } px-3 py-1.5 text-xs font-medium rounded-r-md transition-all`}
            type="button"
          >
            Anual
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={timeSeriesData[selectedPeriod as keyof typeof timeSeriesData]}
          margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name"
            tick={{ fontSize: 12 }}
            padding={{ left: 5, right: 5 }}
          />
          <YAxis 
            tickFormatter={formatNumber}
            tick={{ fontSize: 12 }}
            width={40}
          />
          <Tooltip 
            formatter={(value) => [formatNumber(value), '']}
            labelStyle={{ color: '#555' }}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontSize: '12px'
            }}
          />
          <RechartsLegend wrapperStyle={{ fontSize: isMobile ? 10 : 12, paddingTop: 10 }} />
          <Line
            type="monotone"
            dataKey="acessos"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={{ r: 3, fill: '#4F46E5' }}
            activeDot={{ r: 6 }}
            name="Acessos"
          />
          <Line
            type="monotone"
            dataKey="pedidos"
            stroke="#F97316"
            strokeWidth={2}
            dot={{ r: 3, fill: '#F97316' }}
            activeDot={{ r: 6 }}
            name="Pedidos"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
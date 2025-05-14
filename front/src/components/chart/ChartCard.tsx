import React, { useState } from "react";

interface ChartCardProps {
  title: string;
  showPeriodSelector?: boolean;
  chartContent: React.ReactNode;
}


const ChartCard: React.FC<ChartCardProps> = ({
  title,
  showPeriodSelector = false,
  chartContent,
}) => {
  const [activePeriod, setActivePeriod] = useState("week");

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>

        {showPeriodSelector && (
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                activePeriod === "day"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setActivePeriod("day")}
            >
              Dia
            </button>
            <button
              className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                activePeriod === "week"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setActivePeriod("week")}
            >
              Semana
            </button>
            <button
              className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                activePeriod === "month"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setActivePeriod("month")}
            >
              Mês
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-100 h-64 rounded flex items-center justify-center text-gray-500">
        {chartContent}
      </div>
    </div>
  );
};

export default ChartCard;

import React from "react";

type Color = "blue" | "green" | "red" | "yellow" | "purple" | "orange";

interface StatCardProps {
  icon: string;
  color: Color;
  value: string;
  title: string;
}

const StatCard = ({ icon, color, value, title }: StatCardProps) => {
  const colorMap = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 flex flex-col">
      <div
        className={`${colorMap[color]} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4`}
      >
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-gray-500 text-sm">{title}</div>
    </div>
  );
};

export default StatCard;

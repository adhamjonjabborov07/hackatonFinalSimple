import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`p-4 rounded-lg shadow-sm bg-${color}-100 flex items-center gap-4`}>
      <div className={`text-${color}-600 text-3xl`}>{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;

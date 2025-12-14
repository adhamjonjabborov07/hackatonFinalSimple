import React from "react";

const AlertCard = ({ title, description, type = "info", onClose }) => {
  const getBorderColor = () => {
    switch (type) {
      case "warning":
        return "border-yellow-400 bg-yellow-50";
      case "error":
        return "border-red-400 bg-red-50";
      case "success":
        return "border-green-400 bg-green-50";
      default:
        return "border-blue-400 bg-blue-50";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "success":
        return "✅";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className={`p-4 rounded-lg ${getBorderColor()} border-l-4`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className="text-xl mt-0.5">{getIcon()}</div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertCard;

import React from "react";

const Badge = ({ text, type = "default", size = "md" }) => {
  const getStyles = () => {
    const base = "inline-flex items-center rounded-full font-medium";
    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    switch (type) {
      case "success":
        return `${base} ${sizes[size]} bg-green-100 text-green-800`;
      case "warning":
        return `${base} ${sizes[size]} bg-yellow-100 text-yellow-800`;
      case "error":
        return `${base} ${sizes[size]} bg-red-100 text-red-800`;
      case "info":
        return `${base} ${sizes[size]} bg-blue-100 text-blue-800`;
      case "primary":
        return `${base} ${sizes[size]} bg-blue-600 text-white`;
      case "secondary":
        return `${base} ${sizes[size]} bg-gray-100 text-gray-800`;
      default:
        return `${base} ${sizes[size]} bg-gray-200 text-gray-700`;
    }
  };

  return <span className={getStyles()}>{text}</span>;
};

export default Badge;

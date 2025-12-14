import React from "react";
import { MenuOutlined } from "@ant-design/icons";

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center lg:hidden">
      <button onClick={onMenuClick} className="text-gray-600 hover:text-gray-800">
        <MenuOutlined className="text-xl" />
      </button>
      <span className="font-bold text-xl ml-4">PayVision</span>
    </header>
  );
};

export default Header;
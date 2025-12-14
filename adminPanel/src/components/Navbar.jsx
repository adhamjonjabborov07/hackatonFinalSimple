import React from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, SettingOutlined, BellOutlined } from "@ant-design/icons";

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <UserOutlined className="text-xl text-blue-600" />
                    <span className="font-medium text-gray-800">
                        {user ? `${user.name} ${user.surname}` : "Guest"}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all">
                    <BellOutlined className="text-xl" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all">
                    <SettingOutlined className="text-xl" />
                </button>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                >
                    <LogoutOutlined /> Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
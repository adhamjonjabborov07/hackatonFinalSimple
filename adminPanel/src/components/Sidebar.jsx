import React from "react";
import { UserOutlined, SettingOutlined, HomeOutlined } from "@ant-design/icons";

const Sidebar = ({ active, setActive }) => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <div className="p-6 flex items-center gap-2 border-b border-gray-700">
                <HomeOutlined className="text-2xl" />
                <span className="font-bold text-xl">MyAdmin</span>
            </div>
            <div className="flex flex-col p-4 mt-4 gap-2">
                <button
                    className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${active === "dashboard" ? "bg-gray-700" : ""}`}
                    onClick={() => setActive("dashboard")}
                >
                    <HomeOutlined /> Dashboard
                </button>
                <button
                    className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${active === "users" ? "bg-gray-700" : ""}`}
                    onClick={() => setActive("users")}
                >
                    <UserOutlined /> Users
                </button>
                <button
                    className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${active === "settings" ? "bg-gray-700" : ""}`}
                    onClick={() => setActive("settings")}
                >
                    <SettingOutlined /> Settings
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

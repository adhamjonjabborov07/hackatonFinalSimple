import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    HomeOutlined,
    UsergroupAddOutlined,
    WarningOutlined,
    CalculatorOutlined,
    RobotOutlined,
    TrophyOutlined,
    LineChartOutlined,
    DashboardOutlined
} from "@ant-design/icons";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard", path: "/" },
        { key: "employees", icon: <UsergroupAddOutlined />, label: "Employees", path: "/employees" },
        { key: "risk-alerts", icon: <WarningOutlined />, label: "Risk Alerts", path: "/risk-alerts" },
        { key: "salary-calculator", icon: <CalculatorOutlined />, label: "Salary Calculator", path: "/salary-calculator" },
        { key: "salary-simulator", icon: <RobotOutlined />, label: "Salary Simulator", path: "/salary-simulator" },
        { key: "salary-timeline", icon: <LineChartOutlined />, label: "Salary Timeline", path: "/salary-timeline" },
        { key: "smart-insights", icon: <HomeOutlined />, label: "Smart Insights", path: "/smart-insights" },
        { key: "achievements", icon: <TrophyOutlined />, label: "Achievements", path: "/achievements" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex flex-col h-screen w-64 bg-gray-800 text-white shadow-lg overflow-hidden">
            <div className="p-6 flex items-center gap-2 border-b border-gray-700 flex-shrink-0">
                <span className="font-bold text-xl">PayVision</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1 min-h-0">
                {menuItems.map((item) => (
                    <button
                        key={item.key}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 w-full text-left ${isActive(item.path) ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
                            }`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </div>

            <div className="p-4 bg-white text-gray-800 flex-shrink-0 border-t border-gray-300">
                <span className="text-sm font-medium">© 2025 PayVision</span>
            </div>
        </div>

    );
};

export default Sidebar;

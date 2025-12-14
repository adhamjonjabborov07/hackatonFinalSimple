import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import RiskAlerts from "./pages/RiskAlerts";
import SalaryCalculator from "./pages/SalaryCalculator";
import SalarySimulator from "./pages/SalarySimulator";
import SalaryTimeline from "./pages/SalaryTimeline";
import SmartInsights from "./pages/SmartInsights";
import Achievements from "./pages/Achievements";

function App() {
    const [active, setActive] = useState("dashboard");
    const [user, setUser] = useState({
        name: "Admin",
        surname: "User",
        email: "admin@example.com",
    });

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <BrowserRouter>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar active={active} setActive={setActive} />
                <div className="flex-1 flex flex-col">
                    <Navbar user={user} onLogout={handleLogout} />
                    <div className="flex-1 p-6 overflow-auto">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/employees" element={<Employees />} />
                            <Route path="/risk-alerts" element={<RiskAlerts />} />
                            <Route path="/salary-calculator" element={<SalaryCalculator />} />
                            <Route path="/salary-simulator" element={<SalarySimulator />} />
                            <Route path="/salary-timeline" element={<SalaryTimeline />} />
                            <Route path="/smart-insights" element={<SmartInsights />} />
                            <Route path="/achievements" element={<Achievements />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Tabs, Select, Button, message } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ChartBox from "../components/ChartBox";
import StatCard from "../components/StatCard";
import { DollarOutlined, TeamOutlined, RiseOutlined } from "@ant-design/icons";

const { Option } = Select;

// Static fallback data
const staticSalaryData = [
    { month: "Jan", total: 5000, avg: 500, employees: 10 },
    { month: "Feb", total: 7000, avg: 700, employees: 10 },
    { month: "Mar", total: 8000, avg: 800, employees: 10 },
];

const staticDepartmentData = [
    { name: "HR", value: 3000 },
    { name: "IT", value: 7000 },
    { name: "Sales", value: 5000 },
];

const SalaryTimeline = () => {
    const [timePeriod, setTimePeriod] = useState("monthly");
    const [year, setYear] = useState("2024");
    const [salaryData, setSalaryData] = useState(staticSalaryData);
    const [departmentData, setDepartmentData] = useState(staticDepartmentData);

    const fetchData = async () => {
        try {
            const salaryRes = await axios.get(`http://localhost:5000/api/salaries?year=${year}`);
            const deptRes = await axios.get("http://localhost:5000/api/departments");
            setSalaryData(salaryRes.data.length ? salaryRes.data : staticSalaryData);
            setDepartmentData(deptRes.data.length ? deptRes.data : staticDepartmentData);
        } catch (err) {
            message.warning("Failed to fetch API data. Using static fallback data.");
            setSalaryData(staticSalaryData);
            setDepartmentData(staticDepartmentData);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [year, timePeriod]);

    const handleExport = () => {
        message.info("Export functionality is not implemented yet.");
    };

    const totalSalary = salaryData.reduce((sum, item) => sum + (item.total || 0), 0);
    const totalEmployees = salaryData[salaryData.length - 1]?.employees || 0;
    const avgSalary = salaryData[salaryData.length - 1]?.avg || 0;

    const tabsItems = [
        {
            key: "1",
            label: "Salary Timeline",
            children: (
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" name="Total Salary" stroke="#3b82f6" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="avg" name="Average Salary" stroke="#10b981" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ),
        },
        {
            key: "2",
            label: "Department Breakdown",
            children: (
                <div className="h-96">
                    <ChartBox title="Salary by Department" chartData={departmentData} color="#8b5cf6" />
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Salary Timeline & Analytics</h1>
                <p className="text-gray-600">Track salary payments and analyze trends over time</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                    <div className="flex gap-4">
                        <Select value={timePeriod} onChange={setTimePeriod} style={{ width: 200 }}>
                            <Option value="monthly">Monthly</Option>
                            <Option value="quarterly">Quarterly</Option>
                            <Option value="yearly">Yearly</Option>
                        </Select>
                        <Select value={year} onChange={setYear} style={{ width: 120 }}>
                            <Option value="2024">2024</Option>
                            <Option value="2023">2023</Option>
                            <Option value="2022">2022</Option>
                        </Select>
                    </div>
                    <Button type="primary" onClick={handleExport}>Export Report</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Salary Paid" value={`$${totalSalary.toLocaleString()}`} icon={<DollarOutlined className="text-2xl" />} color="blue" />
                    <StatCard title="Total Employees" value={totalEmployees} icon={<TeamOutlined className="text-2xl" />} color="green" />
                    <StatCard title="Average Salary" value={`$${avgSalary.toLocaleString()}`} icon={<RiseOutlined className="text-2xl" />} color="purple" />
                    <StatCard title="Growth Rate" value="12%" trend={12} trendLabel="vs last year" color="green" />
                </div>

                <Tabs defaultActiveKey="1" items={tabsItems} />
            </div>
        </div>
    );
};

export default SalaryTimeline;

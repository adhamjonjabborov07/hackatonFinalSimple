import React, { useState } from "react";
import { Card, Tabs, Button, message, Select } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ChartBox from "../components/ChartBox";
import StatCard from "../components/StatCard";
import AlertCard from "../components/AlertCard";
import Badge from "../components/Badge";
import { DollarOutlined,  TeamOutlined, RiseOutlined, WarningOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TabPane } = Tabs;

const SmartInsights = () => {
    const [timePeriod, setTimePeriod] = useState("monthly");

    const salaryData = [
        { name: "Jan", employees: 15, total: 45000, avg: 3000 },
        { name: "Feb", employees: 16, total: 48000, avg: 3000 },
        { name: "Mar", employees: 17, total: 52000, avg: 3059 },
        { name: "Apr", employees: 18, total: 55000, avg: 3056 },
        { name: "May", employees: 19, total: 60000, avg: 3158 },
        { name: "Jun", employees: 20, total: 65000, avg: 3250 },
    ];

    const departmentData = [
        { name: "Engineering", value: 45000, employees: 12 },
        { name: "Sales", value: 30000, employees: 8 },
        { name: "Marketing", value: 20000, employees: 6 },
        { name: "HR", value: 15000, employees: 4 },
        { name: "Finance", value: 25000, employees: 5 },
    ];

    const positionData = [
        { name: "Developer", value: 35000, count: 8 },
        { name: "Manager", value: 60000, count: 4 },
        { name: "Intern", value: 20000, count: 6 },
        { name: "Analyst", value: 40000, count: 5 },
        { name: "Designer", value: 30000, count: 3 },
    ];

    const insights = [
        {
            id: 1,
            title: "Salary Growth Trend",
            description: "Salary payments have increased by 12% compared to last year, indicating positive company growth.",
            type: "success",
        },
        {
            id: 2,
            title: "Department Analysis",
            description: "Engineering department has the highest average salary at $3,750 per employee.",
            type: "info",
        },
        {
            id: 3,
            title: "Compliance Check",
            description: "All salary payments are compliant with labor laws and company policies.",
            type: "success",
        },
    ];

    const handleGenerateReport = () => {
        message.success("Report generated successfully");
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Smart Insights & Analytics</h1>
                <p className="text-gray-600">Advanced analytics and insights for salary management</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                    <Select
                        value={timePeriod}
                        onChange={setTimePeriod}
                        style={{ width: 200 }}
                    >
                        <Option value="monthly">Monthly</Option>
                        <Option value="quarterly">Quarterly</Option>
                        <Option value="yearly">Yearly</Option>
                    </Select>
                    <Button type="primary" onClick={handleGenerateReport}>Generate Report</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard
                        title="Total Salary Paid"
                        value={`$${salaryData.reduce((sum, item) => sum + item.total, 0).toLocaleString()}`}
                        icon={<DollarOutlined className="text-2xl" />}
                        color="blue"
                    />
                    <StatCard
                        title="Total Employees"
                        value={salaryData.reduce((sum, item) => sum + item.employees, 0)}
                        icon={<TeamOutlined className="text-2xl" />}
                        color="green"
                    />
                    <StatCard
                        title="Average Salary"
                        value={`$${(salaryData.reduce((sum, item) => sum + item.avg, 0) / salaryData.length).toFixed(0).toLocaleString()}`}
                        icon={<RiseOutlined className="text-2xl" />}
                        color="purple"
                    />
                    <StatCard
                        title="Growth Rate"
                        value="12%"
                        trend={12}
                        trendLabel="vs last year"
                        color="green"
                    />
                </div>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Overview" key="1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            <div className="h-96">
                                <h3 className="text-lg font-semibold mb-4">Salary Distribution</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={salaryData}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total" name="Total Salary" fill="#3b82f6" />
                                        <Bar dataKey="avg" name="Average Salary" fill="#10b981" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="h-96">
                                <h3 className="text-lg font-semibold mb-4">Department Breakdown</h3>
                                <ChartBox
                                    title="Salary by Department"
                                    chartData={departmentData}
                                    color="#8b5cf6"
                                />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Detailed Analysis" key="2">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            <Card title="By Position">
                                <div className="h-64">
                                    <ChartBox
                                        title="Salary by Position"
                                        chartData={positionData}
                                        color="#f59e0b"
                                    />
                                </div>
                            </Card>
                            <Card title="Key Metrics">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                                        <span className="font-medium">Highest Salary</span>
                                        <span className="font-medium text-blue-600">$8,500</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                                        <span className="font-medium">Lowest Salary</span>
                                        <span className="font-medium text-green-600">$1,800</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                                        <span className="font-medium">Median Salary</span>
                                        <span className="font-medium text-yellow-600">$3,200</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                                        <span className="font-medium">Salary Range</span>
                                        <span className="font-medium text-purple-600">$6,700</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </TabPane>
                </Tabs>
            </div>

            <Card className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Smart Insights</h3>
                <div className="space-y-4">
                    {insights.map((insight) => (
                        <AlertCard
                            key={insight.id}
                            title={insight.title}
                            description={insight.description}
                            type={insight.type}
                        />
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Department Statistics">
                    <div className="space-y-4">
                        {departmentData.map((dept, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded">
                                <div className="flex items-center gap-3">
                                    <Badge text={dept.name} type="info" />
                                    <span className="text-sm text-gray-600">Employees: {dept.employees}</span>
                                </div>
                                <span className="font-medium">${dept.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="Position Statistics">
                    <div className="space-y-4">
                        {positionData.map((pos, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded">
                                <div className="flex items-center gap-3">
                                    <Badge text={pos.name} type="info" />
                                    <span className="text-sm text-gray-600">Count: {pos.count}</span>
                                </div>
                                <span className="font-medium">${pos.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SmartInsights;
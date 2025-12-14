import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ChartBox = ({ title, chartData, color = "blue" }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill={color} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// Sample data for testing
ChartBox.defaultProps = {
    chartData: [
        { name: "Jan", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 2000 },
        { name: "Apr", value: 2780 },
        { name: "May", value: 1890 },
        { name: "Jun", value: 2390 },
        { name: "Jul", value: 3490 },
    ],
};

export default ChartBox;
import React, { useState } from "react";
import { Card, Tabs, Button, message, Select, Badge as AntBadge } from "antd";
import { TrophyOutlined, TeamOutlined, DollarOutlined, CalendarOutlined, CheckCircleOutlined } from "@ant-design/icons";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";

const { Option } = Select;
const { TabPane } = Tabs;

const Achievements = () => {
    const [timePeriod, setTimePeriod] = useState("monthly");

    const achievements = [
        {
            id: 1,
            title: "Salary Compliance Achievement",
            description: "Maintained 100% salary compliance for all employees throughout the year.",
            points: 100,
            date: "2024-12-15",
            category: "compliance",
        },
        {
            id: 2,
            title: "On-Time Payments",
            description: "Achieved 99.5% on-time salary payments for Q4 2024.",
            points: 95,
            date: "2024-11-30",
            category: "performance",
        },
        {
            id: 3,
            title: "Salary Growth Milestone",
            description: "Reached $100,000 monthly salary payments milestone.",
            points: 80,
            date: "2024-10-15",
            category: "growth",
        },
        {
            id: 4,
            title: "Employee Satisfaction",
            description: "Achieved 95% employee satisfaction with salary structure.",
            points: 75,
            date: "2024-09-20",
            category: "satisfaction",
        },
        {
            id: 5,
            title: "Bonus Compliance",
            description: "All bonuses processed according to company policy.",
            points: 60,
            date: "2024-08-10",
            category: "compliance",
        },
    ];

    const teamAchievements = [
        {
            id: 1,
            title: "Engineering Team",
            description: "Consistently met salary budget targets for 6 months.",
            points: 150,
            date: "2024-12-01",
        },
        {
            id: 2,
            title: "HR Team",
            description: "Successfully implemented new salary structure.",
            points: 120,
            date: "2024-11-15",
        },
        {
            id: 3,
            title: "Finance Team",
            description: "Achieved 100% accuracy in salary calculations.",
            points: 100,
            date: "2024-10-20",
        },
    ];

    const handleExport = () => {
        message.info("Export functionality would be implemented here");
    };

    const getTotalPoints = () => {
        return achievements.reduce((sum, achievement) => sum + achievement.points, 0);
    };

    const getAchievementsByCategory = (category) => {
        return achievements.filter(ach => ach.category === category);
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Achievements & Milestones</h1>
                <p className="text-gray-600">Track and celebrate salary management achievements</p>
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
                    <Button type="primary" onClick={handleExport}>Export Achievements</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard
                        title="Total Achievements"
                        value={achievements.length}
                        icon={<TrophyOutlined className="text-2xl" />}
                        color="yellow"
                    />
                    <StatCard
                        title="Total Points"
                        value={getTotalPoints()}
                        icon={<CheckCircleOutlined className="text-2xl" />}
                        color="green"
                    />
                    <StatCard
                        title="Team Achievements"
                        value={teamAchievements.length}
                        icon={<TeamOutlined className="text-2xl" />}
                        color="blue"
                    />
                    <StatCard
                        title="Compliance Achievements"
                        value={getAchievementsByCategory("compliance").length}
                        icon={<DollarOutlined className="text-2xl" />}
                        color="purple"
                    />
                </div>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Individual Achievements" key="1">
                        <div className="space-y-4 mt-6">
                            {achievements.map((achievement) => (
                                <div key={achievement.id} className="p-4 border rounded-lg hover:shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                                                <Badge text={achievement.category} type="info" size="sm" />
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <CalendarOutlined className="text-gray-400" />
                                                    {new Date(achievement.date).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <TrophyOutlined className="text-gray-400" />
                                                    {achievement.points} points
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPane>
                    <TabPane tab="Team Achievements" key="2">
                        <div className="space-y-4 mt-6">
                            {teamAchievements.map((achievement) => (
                                <div key={achievement.id} className="p-4 border rounded-lg hover:shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800 mb-2">{achievement.title}</h4>
                                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <CalendarOutlined className="text-gray-400" />
                                                    {new Date(achievement.date).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <TrophyOutlined className="text-gray-400" />
                                                    {achievement.points} points
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPane>
                </Tabs>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Achievements by Category">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                            <div className="flex items-center gap-2">
                                <Badge text="Compliance" type="info" />
                                <span className="text-sm text-gray-600">{getAchievementsByCategory("compliance").length} achievements</span>
                            </div>
                            <span className="font-medium">{getAchievementsByCategory("compliance").reduce((sum, a) => sum + a.points, 0)} points</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                            <div className="flex items-center gap-2">
                                <Badge text="Performance" type="success" />
                                <span className="text-sm text-gray-600">{getAchievementsByCategory("performance").length} achievements</span>
                            </div>
                            <span className="font-medium">{getAchievementsByCategory("performance").reduce((sum, a) => sum + a.points, 0)} points</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                            <div className="flex items-center gap-2">
                                <Badge text="Growth" type="warning" />
                                <span className="text-sm text-gray-600">{getAchievementsByCategory("growth").length} achievements</span>
                            </div>
                            <span className="font-medium">{getAchievementsByCategory("growth").reduce((sum, a) => sum + a.points, 0)} points</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                            <div className="flex items-center gap-2">
                                <Badge text="Satisfaction" type="info" />
                                <span className="text-sm text-gray-600">{getAchievementsByCategory("satisfaction").length} achievements</span>
                            </div>
                            <span className="font-medium">{getAchievementsByCategory("satisfaction").reduce((sum, a) => sum + a.points, 0)} points</span>
                        </div>
                    </div>
                </Card>

                <Card title="Recent Achievements">
                    <div className="space-y-4">
                        {achievements.slice(0, 5).map((achievement) => (
                            <div key={achievement.id} className="flex justify-between items-center p-3 border rounded">
                                <div className="flex items-center gap-2">
                                    <TrophyOutlined className="text-yellow-500" />
                                    <span className="text-sm font-medium">{achievement.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">{achievement.points} pts</span>
                                    <AntBadge color="green" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Achievements;
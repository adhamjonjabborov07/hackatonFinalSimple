import React, { useState } from "react";
import { Button, Card, Tabs, Empty, message } from "antd";
import AlertCard from "../components/AlertCard";
import Badge from "../components/Badge";
import StatCard from "../components/StatCard";
import { WarningOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const RiskAlerts = () => {
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            title: "Past maoshga rioya qilinmagan",
            description: "John Doe xodimining maoshi lavozim bo‘yicha minimal ish haqidan past.",
            type: "warning",
            employee: "John Doe",
            department: "Marketing",
            createdAt: "2024-01-15",
        },
        {
            id: 2,
            title: "Maoshda nomuvofiqlik",
            description: "Jane Smith xodimining maoshi hisob-kitobida $500 nomuvofiqlik mavjud.",
            type: "error",
            employee: "Jane Smith",
            department: "Savdo",
            createdAt: "2024-01-14",
        },
        {
            id: 3,
            title: "Bonus tasdiqlanishi kutmoqda",
            description: "Michael Johnson xodimining bonus tasdiqlanishi 15 kundan oshiq.",
            type: "warning",
            employee: "Michael Johnson",
            department: "Injenerlik",
            createdAt: "2024-01-10",
        },
        {
            id: 4,
            title: "Maosh muvaffaqiyatli to‘landi",
            description: "Sarah Williams xodimining maoshi muvaffaqiyatli to‘landi.",
            type: "success",
            employee: "Sarah Williams",
            department: "HR",
            createdAt: "2024-01-05",
        },
    ]);

    const [resolvedAlerts, setResolvedAlerts] = useState([
        {
            id: 5,
            title: "Maosh sozlamasi yakunlandi",
            description: "Robert Brown xodimining maosh sozlamasi yakunlandi.",
            type: "success",
            employee: "Robert Brown",
            department: "Moliyaviy",
            createdAt: "2024-01-01",
        },
    ]);

    const handleResolve = (id) => {
        // Alertni resolvedAlertsga ko‘chirish
        const alertToResolve = alerts.find(a => a.id === id);
        if (alertToResolve) {
            setResolvedAlerts(prev => [...prev, alertToResolve]);
            setAlerts(prev => prev.filter(a => a.id !== id));
            message.success("Alert muvaffaqiyatli hal qilindi");
        }
    };

    const handleDismiss = (id) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
        message.info("Alert bekor qilindi");
    };

    const getAlertsByType = (type) => alerts.filter(alert => alert.type === type);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Xatar bildirishnomalari</h1>
                <p className="text-gray-600">Xodimlar maoshi va bonuslarda yuzaga kelishi mumkin bo‘lgan xatarlarni kuzatish va boshqarish</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard
                    title="Jami bildirishnomalar"
                    value={alerts.length + resolvedAlerts.length}
                    icon={<ExclamationCircleOutlined className="text-2xl" />}
                    color="red"
                />
                <StatCard
                    title="Ogohlantirishlar"
                    value={getAlertsByType("warning").length}
                    icon={<WarningOutlined className="text-2xl" />}
                    color="yellow"
                />
                <StatCard
                    title="Hal qilinganlar"
                    value={resolvedAlerts.length}
                    icon={<CheckCircleOutlined className="text-2xl" />}
                    color="green"
                />
            </div>

            <Card className="mb-6">
                <Tabs defaultActiveKey="1" className="ant-tabs-card">
                    <TabPane tab="Faol alertlar" key="1">
                        {alerts.length > 0 ? (
                            <div className="space-y-4">
                                {alerts.map(alert => (
                                    <AlertCard
                                        key={alert.id}
                                        title={alert.title}
                                        description={alert.description}
                                        type={alert.type}
                                        onResolve={() => handleResolve(alert.id)}
                                        onClose={() => handleDismiss(alert.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Empty description="Faol alertlar mavjud emas" />
                        )}
                    </TabPane>

                    <TabPane tab="Hal qilingan alertlar" key="2">
                        {resolvedAlerts.length > 0 ? (
                            <div className="space-y-4">
                                {resolvedAlerts.map(alert => (
                                    <AlertCard
                                        key={alert.id}
                                        title={alert.title}
                                        description={alert.description}
                                        type={alert.type}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Empty description="Hal qilingan alertlar mavjud emas" />
                        )}
                    </TabPane>
                </Tabs>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold mb-4">Alertlar bo‘yicha umumiy ma'lumot</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium mb-2">Bo‘limlar bo‘yicha</h4>
                        <div className="space-y-2">
                            {[...new Set([...alerts, ...resolvedAlerts].map(a => a.department))].map(dep => {
                                const count = [...alerts, ...resolvedAlerts].filter(a => a.department === dep).length;
                                return (
                                    <div key={dep} className="flex justify-between">
                                        <Badge text={dep} type="info" />
                                        <span className="text-sm text-gray-600">{count} alert</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Turlar bo‘yicha</h4>
                        <div className="space-y-2">
                            {["warning", "error", "success"].map(type => {
                                const count = [...alerts, ...resolvedAlerts].filter(a => a.type === type).length;
                                return (
                                    <div key={type} className="flex justify-between">
                                        <Badge text={type === "warning" ? "Ogohlantirish" : type === "error" ? "Xato" : "Muvaffaqiyat"} type={type} />
                                        <span className="text-sm text-gray-600">{count} alert</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RiskAlerts;

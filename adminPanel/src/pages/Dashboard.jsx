import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../api";
import StatCard from "../components/StatCard";
import EmployeeForm from "../components/EmployeeForm";
import { UserOutlined, TeamOutlined, DollarOutlined, RiseOutlined } from "@ant-design/icons";

const { Option } = Select;

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [form] = Form.useForm();

    const fetchEmployees = async () => {
        try {
            const res = await getEmployees();
            setEmployees(res.data);
        } catch (err) {
            message.error("Failed to fetch users");
            console.log(err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const showModal = (employee = null) => {
        setEditingEmployee(employee);
        setIsModalVisible(true);

        if (employee) {
            form.setFieldsValue({
                name: employee.name,
                surname: employee.surname,
                email: employee.email,
                role: employee.role,
                position: employee.position,
                department: employee.department,
                baseSalary: employee.salary?.base || 0,
                kpiPercentage: employee.salary?.kpiPercent || 0,
                bonus: employee.salary?.bonus || 0,
                penalty: employee.salary?.penalty || 0,
            });
        } else {
            form.resetFields();
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingEmployee(null);
        form.resetFields();
    };

    const handleFinish = async (values) => {
        try {
            const payload = {
                name: values.name,
                surname: values.surname,
                email: values.email,
                role: values.role || "employee",
                position: values.position || "",
                department: values.department || "",
                salary: {
                    base: Number(values.baseSalary),
                    kpiPercent: Number(values.kpiPercentage || 0),
                    bonus: Number(values.bonus || 0),
                    penalty: Number(values.penalty || 0),
                },
            };

            if (editingEmployee) {
                await updateEmployee(editingEmployee._id, payload);
                message.success("User updated successfully");
            } else {
                await createEmployee(payload);
                message.success("User added successfully");
            }

            fetchEmployees();
            handleCancel();
        } catch (err) {
            console.log(err.response?.data || err.message);
            message.error(err.response?.data?.message || "Failed to save user");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            message.success("User deleted successfully");
            fetchEmployees();
        } catch (err) {
            message.error("Failed to delete user");
        }
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Surname", dataIndex: "surname", key: "surname" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Department", dataIndex: "department", key: "department" },
        { title: "Position", dataIndex: "position", key: "position" },
        { title: "Role", dataIndex: "role", key: "role" },
        {
            title: "Base Salary",
            key: "salary",
            render: (_, record) => `$${record.salary?.base || 0}`,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button type="primary" onClick={() => showModal(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
                </div>
            ),
        },
    ];

    const stats = {
        totalUsers: employees.length,
        totalAdmins: employees.filter(u => u.role === "admin").length,
        totalSalary: employees.reduce((sum, u) => sum + (u.salary?.base || 0), 0),
        avgSalary: employees.length > 0 ? employees.reduce((sum, u) => sum + (u.salary?.base || 0), 0) / employees.length : 0,
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Boshqaruv paneli</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard title="Total Users" value={stats.totalUsers} icon={<TeamOutlined className="text-2xl" />} color="blue" />
                <StatCard title="Admins" value={stats.totalAdmins} icon={<UserOutlined className="text-2xl" />} color="green" />
                <StatCard title="Maoshlar Tahlili" value={`$${stats.totalSalary.toLocaleString()}`} icon={<DollarOutlined className="text-2xl" />} color="purple" />
                <StatCard title="Maoshlar Timeline" value={`$${Math.round(stats.avgSalary).toLocaleString()}`} icon={<RiseOutlined className="text-2xl" />} color="yellow" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Users Management</h2>
                    <Button type="primary" onClick={() => showModal()}>Xodim qo'shish</Button>
                </div>
                <Table columns={columns} dataSource={employees} rowKey="_id" />
            </div>

            <Modal title={editingEmployee ? "Edit User" : "Add User"} open={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" initialValues={{ role: "employee" }} onFinish={handleFinish}>
                    <EmployeeForm />

                    <div className="flex justify-end gap-2 mt-6">
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit">{editingEmployee ? "Update" : "Add"}</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Dashboard;

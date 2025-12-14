import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../api";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import StatCard from "../components/StatCard";
import { UserOutlined, DollarOutlined, TeamOutlined, RiseOutlined } from "@ant-design/icons";

const { Option } = Select;

const Employees = () => {
  const [employees, setEmployees] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form] = Form.useForm();

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      message.error("Foydalanuvchilarni yuklab bo'lmadi");
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
        message.success("Foydalanuvchi muvaffaqiyatli yangilandi");
      } else {
        await createEmployee(payload);
        message.success("Foydalanuvchi muvaffaqiyatli qo'shildi");
      }

      fetchEmployees();
      handleCancel();
    } catch (err) {
      console.log(err.response ? err.response.data : err.message);
      message.error("Foydalanuvchini saqlashda xato");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      message.success("Foydalanuvchi muvaffaqiyatli o'chirildi");
      fetchEmployees();
    } catch (err) {
      message.error("Foydalanuvchini o'chirishda xato");
      console.log(err);
    }
  };

  const calculateStats = () => {
    const totalUsers = employees.length;
    const totalAdmins = employees.filter(u => u.role === "admin").length;
    const totalSalary = employees.reduce((sum, u) => sum + (u.salary?.base || 0), 0);
    const avgSalary = totalUsers > 0 ? totalSalary / employees.length : 0;

    return { totalUsers, totalAdmins, totalSalary, avgSalary };
  };

  const stats = calculateStats();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Foydalanuvchilar boshqaruvi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Jami foydalanuvchilar" value={stats.totalUsers} icon={<TeamOutlined />} color="blue" />
        <StatCard title="Administratorlar" value={stats.totalAdmins} icon={<UserOutlined />} color="green" />
        <StatCard title="Jami maosh" value={`$${stats.totalSalary.toLocaleString()}`} icon={<DollarOutlined />} color="purple" />
        <StatCard title="O'rtacha maosh" value={`$${Math.round(stats.avgSalary).toLocaleString()}`} icon={<RiseOutlined />} color="yellow" />
      </div>

      <Button type="primary" onClick={() => showModal()} className="mb-4 bg-blue-600 hover:bg-blue-700">
        Foydalanuvchi qo'shish
      </Button>

      <EmployeeTable
        dataSource={employees}
        onEdit={showModal}
        onDelete={handleDelete}
        onViewSalary={(user) => message.info(`Foydalanuvchi maoshi: ${user.name} - $${user.salary?.base || 0}`)}
      />

      <Modal
        title={editingEmployee ? "Foydalanuvchini tahrirlash" : "Foydalanuvchi qo'shish"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="rounded-lg"
      >
        <Form form={form} layout="vertical" onFinish={handleFinish} className="p-4">
          <EmployeeForm isUzbek={true} />

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCancel}>Bekor qilish</Button>
            <Button type="primary" htmlType="submit">{editingEmployee ? "Yangilash" : "Qo'shish"}</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Employees;

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Table, Button, Modal, Form, Input, Select, message, Card } from "antd";
import { getUsers, createUser, updateUser, deleteUser } from "../api";

const { Option } = Select;

const Dashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      message.error("Userlarni olishda xato");
      console.log(err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const showModal = (user = null) => {
    setEditingUser(user);
    setIsModalVisible(true);

    if (user) {
      form.setFieldsValue({
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      });
    } else {
      form.setFieldsValue({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "user",
      });
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };
  const handleFinish = async (values) => {
    try {
      const payload = { ...values };

      if (editingUser && !payload.password) {
        delete payload.password;
      }

      if (editingUser) {
        await updateUser(editingUser._id, payload);
        message.success("User yangilandi");
      } else {
        await createUser(payload);
        message.success("User qo‘shildi");
      }

      fetchUsers();
      handleCancel();
    } catch (err) {
      console.log(err.response?.data || err.message);
      message.error(err.response?.data?.message || "Xato yuz berdi");
    }
  };


  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("User o‘chirildi");
      fetchUsers();
    } catch (err) {
      message.error("O‘chirishda xato");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Surname", dataIndex: "surname", key: "surname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString()
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

  return (
    <div className="flex min-h-screen">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 p-6 bg-gray-100">

        {active === "dashboard" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card title="Total Users" className="text-center">{users.length}</Card>
              <Card title="Admins" className="text-center">{users.filter(u => u.role === "admin").length}</Card>
            </div>
          </>
        )}

        {active === "users" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Users Management</h1>
            <Button type="primary" className="mb-4" onClick={() => showModal()}>Add User</Button>
            <Table columns={columns} dataSource={users} rowKey="_id" />
          </>
        )}

        {active === "settings" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p>Bu yerga settings qo‘shiladi</p>
          </div>
        )}

        <Modal
          title={editingUser ? "Edit User" : "Add User"}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Surname" name="surname" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
              <Input />
            </Form.Item>

            {!editingUser && (
              <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                <Input.Password />
              </Form.Item>
            )}

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Role tanlang" }]}
            >
              <Select placeholder="Role tanlang">
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>

            <div className="flex justify-end gap-2">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">{editingUser ? "Update" : "Add"}</Button>
            </div>
          </Form>
        </Modal>

      </div>
    </div>
  );
};

export default Dashboard;

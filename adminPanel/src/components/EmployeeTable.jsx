import React from "react";
import { Table, Button } from "antd";

const EmployeeTable = ({ dataSource, onEdit, onDelete, onViewSalary }) => {
  const columns = [
    { title: "Ism", dataIndex: "name", key: "name" },
    { title: "Familiya", dataIndex: "surname", key: "surname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Lavozim", dataIndex: "role", key: "role" },
    { title: "Bo'lim", dataIndex: "department", key: "department" },
    { title: "Unvon", dataIndex: "position", key: "position" },
    { title: "Asosiy maosh", key: "salary", render: (_, record) => `$${record.salary?.base || 0}` },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => onEdit(record)}>Edit</Button>
          <Button danger onClick={() => onDelete(record._id)}>Delete</Button>
          <Button onClick={() => onViewSalary(record)}>Salary</Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} rowKey="_id" />;
};

export default EmployeeTable;

import React from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const EmployeeForm = ({ isUzbek = false }) => {
  return (
    <>
      <Form.Item label={isUzbek ? "Ism" : "Name"} name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label={isUzbek ? "Familiya" : "Surname"} name="surname" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
        <Input />
      </Form.Item>
      <Form.Item label={isUzbek ? "Lavozim" : "Position"} name="position" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label={isUzbek ? "Bo'lim" : "Department"} name="department">
        <Input />
      </Form.Item>
      <Form.Item label={isUzbek ? "Unvon" : "Role"} name="role" rules={[{ required: true }]} initialValue="employee">
        <Select>
          <Option value="employee">{isUzbek ? "Xodim" : "Employee"}</Option>
          <Option value="admin">{isUzbek ? "Administrator" : "Admin"}</Option>
        </Select>
      </Form.Item>
      <Form.Item label={isUzbek ? "Asosiy maosh" : "Base Salary"} name="baseSalary" rules={[{ required: true }]} initialValue={0}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="KPI %" name="kpiPercentage">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Bonus" name="bonus">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Penalty" name="penalty">
        <Input type="number" />
      </Form.Item>
    </>
  );
};

export default EmployeeForm;
import React, { useState } from "react";
import { Card, Form, Input, Button, message, Divider } from "antd";
import { DollarOutlined, CalculatorOutlined, CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { calculateSalaryAPI } from "../api";
import StatCard from "../components/StatCard";

const SalaryCalculator = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (values) => {
    try {
      setLoading(true);

      const payload = {
        baseSalary: Number(values.baseSalary),
        kpiPercentage: Number(values.kpiPercentage || 0),
        bonus: Number(values.bonus || 0),
        penalty: Number(values.penalty || 0),
      };

      const res = await calculateSalaryAPI(payload);
      console.log(res.data);


      setResult(res.data);
      message.success("Salary calculated successfully");
    } catch (err) {
      console.log(err);
      message.error("Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setResult(null);
  };

  return (
    <div className="p-6">
      <Card title="Salary Calculator">
        <Form form={form} layout="vertical" onFinish={handleCalculate}>
          <Form.Item label="Base Salary" name="baseSalary" rules={[{ required: true }]}>
            <Input type="number" placeholder="Base Salary" />
          </Form.Item>

          <Form.Item label="KPI Percentage" name="kpiPercentage" initialValue={0}>
            <Input type="number" placeholder="KPI %" />
          </Form.Item>

          <Form.Item label="Bonus" name="bonus" initialValue={0}>
            <Input type="number" placeholder="Bonus" />
          </Form.Item>

          <Form.Item label="Penalty" name="penalty" initialValue={0}>
            <Input type="number" placeholder="Penalty" />
          </Form.Item>

          <div className="flex gap-2">
            <Button type="primary" htmlType="submit" loading={loading}>
              Calculate
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </Form>

        {result && (
          <div className="mt-4 space-y-2">
            <StatCard title="Base Salary" value={`$${result.baseSalary.toLocaleString()}`} icon={<DollarOutlined />} color="blue" />
            <StatCard title="KPI Amount" value={`$${result.kpiAmount.toLocaleString()}`} icon={<CalculatorOutlined />} color="green" />
            <StatCard title="Bonus" value={`$${result.bonus.toLocaleString()}`} icon={<CheckCircleOutlined />} color="purple" />
            <StatCard title="Penalty" value={`-$${result.penalty.toLocaleString()}`} icon={<WarningOutlined />} color="red" />
            <Divider />
            <StatCard title="Total Salary" value={`$${result.totalSalary.toLocaleString()}`} icon={<DollarOutlined />} color="blue" />
          </div>
        )}
      </Card>
    </div>
  );
};

export default SalaryCalculator;

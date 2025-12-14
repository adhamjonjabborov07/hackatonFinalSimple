import React, { useState } from "react";
import { Button, Form, Input, Card, message, Select, Slider, Divider } from "antd";
import { DollarOutlined, CalculatorOutlined, CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { calculateSalaryAPI } from "../api";
import StatCard from "../components/StatCard";
import AlertCard from "../components/AlertCard";

const { Option } = Select;

const SalarySimulator = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [scenarios, setScenarios] = useState([]);

  const handleCalculate = async (values) => {
    try {
      setIsCalculating(true);
      const response = await calculateSalaryAPI({
        baseSalary: values.baseSalary,
        kpiPercentage: values.kpiPercentage || 0,
        bonus: values.bonus || 0,
        penalty: values.penalty || 0,
      });

      setResult(response.data);

      const newScenario = {
        id: Date.now(),
        baseSalary: values.baseSalary,
        kpiPercentage: values.kpiPercentage || 0,
        bonus: values.bonus || 0,
        penalty: values.penalty || 0,
        total: response.data.totalSalary,
      };

      setScenarios([newScenario, ...scenarios].slice(0, 5));

      message.success("Salary scenario calculated successfully");
    } catch (err) {
      message.error("Failed to calculate salary");
      console.log(err);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setResult(null);
  };

  const handleScenarioClick = (scenario) => {
    form.setFieldsValue({
      baseSalary: scenario.baseSalary,
      kpiPercentage: scenario.kpiPercentage,
      bonus: scenario.bonus,
      penalty: scenario.penalty,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Salary Simulator</h1>
        <p className="text-gray-600">Simulate different salary scenarios and compare results</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Salary Scenario Builder">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCalculate}
          >
            <Form.Item
              label="Base Salary"
              name="baseSalary"
              rules={[{ required: true, message: "Please enter base salary" }]}
            >
              <Slider
                min={1000}
                max={10000}
                step={100}
                tooltip={{ formatter: (value) => `$${value}` }}
              />
            </Form.Item>

            <Form.Item
              label="KPI Percentage"
              name="kpiPercentage"
              initialValue={0}
            >
              <Slider
                min={0}
                max={50}
                step={1}
                tooltip={{ formatter: (value) => `${value}%` }}
              />
            </Form.Item>

            <Form.Item
              label="Bonus"
              name="bonus"
              initialValue={0}
            >
              <Slider
                min={0}
                max={5000}
                step={100}
                tooltip={{ formatter: (value) => `$${value}` }}
              />
            </Form.Item>

            <Form.Item
              label="Penalty"
              name="penalty"
              initialValue={0}
            >
              <Slider
                min={0}
                max={2000}
                step={100}
                tooltip={{ formatter: (value) => `$${value}` }}
              />
            </Form.Item>

            <div className="flex gap-2">
              <Button type="primary" htmlType="submit" loading={isCalculating}>
                Simulate
              </Button>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          </Form>
        </Card>

        <Card title="Simulation Results">
          {result ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Base Salary"
                  value={`$${result.baseSalary.toLocaleString()}`}
                  icon={<DollarOutlined className="text-2xl" />}
                  color="blue"
                />
                <StatCard
                  title="KPI Amount"
                  value={`$${result.kpiAmount.toLocaleString()}`}
                  icon={<CalculatorOutlined className="text-2xl" />}
                  color="green"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Bonus"
                  value={`$${result.bonus.toLocaleString()}`}
                  icon={<CheckCircleOutlined className="text-2xl" />}
                  color="purple"
                />
                <StatCard
                  title="Penalty"
                  value={`-$${result.penalty.toLocaleString()}`}
                  icon={<WarningOutlined className="text-2xl" />}
                  color="red"
                />
              </div>

              <Divider />

              <StatCard
                title="Total Salary"
                value={`$${result.totalSalary.toLocaleString()}`}
                icon={<DollarOutlined className="text-2xl" />}
                color="blue"
              />

              <AlertCard
                title="Simulation Summary"
                description={`This scenario results in a total salary of $${result.totalSalary.toLocaleString()}`}
                type="info"
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No simulation result yet</p>
              <p className="text-sm text-gray-400 mt-1">Adjust the sliders and click Simulate</p>
            </div>
          )}
        </Card>
      </div>

      <Card className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Saved Scenarios</h3>
        {scenarios.length > 0 ? (
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="p-4 border rounded-lg hover:shadow-sm cursor-pointer"
                onClick={() => handleScenarioClick(scenario)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Scenario ${scenario.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Base: ${scenario.baseSalary} + {scenario.kpiPercentage}% KPI + ${scenario.bonus} Bonus - ${scenario.penalty} Penalty
                    </p>
                  </div>
                  <Button type="primary" size="small">Load</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No scenarios saved yet
          </div>
        )}
      </Card>
    </div>
  );
};

export default SalarySimulator;
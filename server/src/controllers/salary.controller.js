import Salary from "../models/salary.js";
import Employee from "../models/user.js";

export const calculateSalary = async (req, res) => {
  try {
    let { baseSalary, kpiPercentage = 0, bonus = 0, penalty = 0 } = req.body;
    baseSalary = Number(baseSalary);
    kpiPercentage = Number(kpiPercentage);
    bonus = Number(bonus);
    penalty = Number(penalty);

    if (!baseSalary) return res.status(400).json({ message: "Base salary is required" });

    const kpiAmount = (baseSalary * kpiPercentage) / 100;
    const totalSalary = baseSalary + kpiAmount + bonus - penalty;

    res.json({ baseSalary, kpiAmount, bonus, penalty, totalSalary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSalaryRecord = async (req, res) => {
  try {
    const { employeeId, baseSalary, kpiPercentage, bonus, penalty, month, year } = req.body;

    if (!employeeId || !baseSalary || !month || !year)
      return res.status(400).json({ message: "Required fields missing" });

    const employeeExists = await Employee.findById(employeeId);
    if (!employeeExists) return res.status(404).json({ message: "Employee not found" });

    const kpiAmount = (baseSalary * (kpiPercentage || 0)) / 100;
    const totalSalary = baseSalary + kpiAmount + (bonus || 0) - (penalty || 0);

    const salaryRecord = await Salary.create({
      employeeId,
      baseSalary,
      kpiPercentage: kpiPercentage || 0,
      bonus: bonus || 0,
      penalty: penalty || 0,
      totalSalary,
      month,
      year,
    });

    res.status(201).json(salaryRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getSalaryRecords = async (req, res) => {
  try {
    const { employeeId, month, year } = req.query;
    let query = {};
    if (employeeId) query.employeeId = employeeId;
    if (month) query.month = month;
    if (year) query.year = year;

    const salaries = await Salary.find(query).populate("employeeId", "name surname email").sort({ createdAt: -1 });
    res.json(salaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id).populate("employeeId", "name surname email");
    if (!salary) return res.status(404).json({ message: "Salary record not found" });
    res.json(salary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSalaryStatus = async (req, res) => {
  try {
    const { status, paymentDate } = req.body;
    const salary = await Salary.findByIdAndUpdate(req.params.id, { status, paymentDate }, { new: true });
    if (!salary) return res.status(404).json({ message: "Salary record not found" });
    res.json(salary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteSalaryRecord = async (req, res) => {
  try {
    const salary = await Salary.findByIdAndDelete(req.params.id);
    if (!salary) return res.status(404).json({ message: "Salary record not found" });
    res.json({ message: "Salary record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import Employee from "../models/user.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, surname, email, role, position, department, salary } = req.body;

    const employee = new Employee({
      name,
      surname,
      email,
      role: role || "employee",
      position: position || "",
      department: department || "",
      salary: {
        base: salary?.base || 0,
        kpiPercent: salary?.kpiPercent || 0,
        bonus: salary?.bonus || 0,
        penalty: salary?.penalty || 0,
      },
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    if (err.code === 11000) { 
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const { name, surname, email, role, position, department, salary } = req.body;

    employee.name = name ?? employee.name;
    employee.surname = surname ?? employee.surname;
    employee.email = email ?? employee.email;
    employee.role = role ?? employee.role;
    employee.position = position ?? employee.position;
    employee.department = department ?? employee.department;

    employee.salary = {
      base: salary?.base ?? employee.salary.base,
      kpiPercent: salary?.kpiPercent ?? employee.salary.kpiPercent,
      bonus: salary?.bonus ?? employee.salary.bonus,
      penalty: salary?.penalty ?? employee.salary.penalty,
    };

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

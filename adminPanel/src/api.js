import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getEmployees = () => API.get("/users"); 
export const createEmployee = (payload) => API.post("/users", payload); 
export const updateEmployee = (id, payload) => API.put(`/users/${id}`, payload); 
export const deleteEmployee = (id) => API.delete(`/users/${id}`); 

export const getSalaries = (params) => API.get("/salary", { params });
export const createSalary = (payload) => API.post("/salary", payload);
export const updateSalary = (id, payload) => API.put(`/salary/${id}`, payload);
export const deleteSalary = (id) => API.delete(`/salary/${id}`);
export const calculateSalaryAPI = (payload) => API.post("/salary/calculate", payload);

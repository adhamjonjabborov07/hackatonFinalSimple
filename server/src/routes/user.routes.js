import express from "express";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../controllers/user.controller.js";
import { body, param } from "express-validator";
import validate from "../middleware/validate.js";

const router = express.Router();

router.get("/", getEmployees);

router.post("/", [
  body("name").notEmpty(),
  body("surname").notEmpty(),
  body("email").isEmail(),
  body("role").optional().isIn(["employee", "admin"]),
  body("salary").optional().isObject(),
  body("salary.base").optional().isNumeric(),
  body("salary.kpiPercent").optional().isNumeric(),
  body("salary.bonus").optional().isNumeric(),
  body("salary.penalty").optional().isNumeric(),
], validate, createEmployee);

router.put("/:id", [
  param("id").isMongoId(),
], validate, updateEmployee);

router.delete("/:id", [
  param("id").isMongoId(),
], validate, deleteEmployee);

export default router;

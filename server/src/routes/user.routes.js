import express from "express";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../controllers/user.controller.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get("/", getEmployees);

router.post("/", [
  body("name").notEmpty().withMessage("Ism bo'sh bo'lishi mumkin emas"),
  body("surname").notEmpty().withMessage("Familiya bo'sh bo'lishi mumkin emas"),
  body("email").isEmail().withMessage("Email formati noto'g'ri"),
  body("role").optional().isIn(["employee", "admin"]),
  body("salary").optional().isObject(),
  body("salary.base").optional().isNumeric(),
  body("salary.kpiPercent").optional().isNumeric(),
  body("salary.bonus").optional().isNumeric(),
  body("salary.penalty").optional().isNumeric(),
], validate, createEmployee); 

router.put("/:id", [
  param("id").isMongoId().withMessage("ID formati noto'g'ri (MongoDB ID bo'lishi kerak)"),
], validate, updateEmployee);

router.delete("/:id", [
  param("id").isMongoId().withMessage("ID formati noto'g'ri (MongoDB ID bo'lishi kerak)"),
], validate, deleteEmployee);

export default router;

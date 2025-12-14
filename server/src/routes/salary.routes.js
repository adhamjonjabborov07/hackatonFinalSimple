import express from "express";
import { calculateSalary, createSalaryRecord, getSalaryRecords, getSalaryById, updateSalaryStatus, deleteSalaryRecord } from "../controllers/salary.controller.js";

const router = express.Router();

router.post("/calculate", calculateSalary);
router.post("/", createSalaryRecord);
router.get("/", getSalaryRecords);
router.get("/:id", getSalaryById);
router.put("/:id", updateSalaryStatus);
router.delete("/:id", deleteSalaryRecord);

export default router;

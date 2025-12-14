import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
    {
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
        baseSalary: { type: Number, required: true },
        kpiPercentage: { type: Number, default: 0 },
        bonus: { type: Number, default: 0 },
        penalty: { type: Number, default: 0 },
        totalSalary: { type: Number, required: true },
        status: { type: String, enum: ["pending", "paid"], default: "pending" },
        paymentDate: { type: Date },
        month: { type: Number, required: true },
        year: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Salary", salarySchema);

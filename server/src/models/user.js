import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        surname: { type: String, required: true, trim: true },
        email: { type: String, unique: true, required: true, trim: true, lowercase: true },
        role: { type: String, enum: ["employee", "admin"], default: "employee", required: true },
        salary: {
            base: { type: Number, default: 0 },
            kpiPercent: { type: Number, default: 0 },
            bonus: { type: Number, default: 0 },
            penalty: { type: Number, default: 0 },
        },
        department: { type: String, default: "", trim: true },
        position: { type: String, default: "", trim: true },
    },
    { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);

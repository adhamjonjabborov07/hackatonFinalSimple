import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import salaryRoutes from "./routes/salary.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/salary", salaryRoutes);

app.get("/", (req, res) => res.send("API ishlayapti"));

export default app;

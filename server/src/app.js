import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js"; // TO‘G‘RI yo‘l

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("🚀 API ishlayapti");
});

export default app;

import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();
console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server ishlayapti: http://localhost:${PORT}`);
});

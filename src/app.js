import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";
import serviceRouter from "./routes/service";
import authRouter from "./routes/authenticate";
import bookingRouter from "./routes/booking";
import shiftRouter from "./routes/shift";
import employeeRouter from "./routes/employee";
const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", serviceRouter);
app.use("/api", bookingRouter);
app.use("/api", shiftRouter);
app.use("/api", employeeRouter);
mongoose.connect("mongodb://localhost:27017/asm")
    .then(() => console.log("Ket noi DB thanh cong"))
    .catch(error => console.log(error))
// connect
const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server của bạn đang chạy cổng ", PORT);
});
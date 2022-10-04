import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";
import serviceRouter from "./routes/service";
import authRouter from "./routes/authenticate";
import bookingRouter from "./routes/booking";
import contactRouter from "./routes/contact";
import employeeRouter from "./routes/employee";
const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", serviceRouter);
app.use("/api", bookingRouter);
app.use("/api", contactRouter);
app.use("/api", employeeRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect DB Successfully"))
  .catch((error) => console.log(error));

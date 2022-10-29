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
import http from "http";
import { Server } from "socket.io";
import { initializeApp } from "firebase-admin/app";
import BannerRouter from "./routes/banner";
import userRouter from "./routes/user";
import feedbackRouter from "./routes/feedback";
const app = express();
import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";
import { getListAdminNotification, newNotification } from "./controllers/notification";
const httpServer = http.createServer(app);
export const io = new Server(httpServer,{
  cors : {
    origin : '*',
    methods: ['GET']
  }
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", serviceRouter);
app.use("/api", bookingRouter);
app.use("/api", userRouter);
app.use("/api", contactRouter);
app.use("/api", employeeRouter);
app.use("/api", feedbackRouter);
app.use("/api", BannerRouter);
io.on("connection",  (socket) => {
    socket.on('newNotification', async (data)=>{
        const notification = {
          bookingId : data.id,
          notificationType : data.type,
          text : data.text
        }
        newNotification(notification)
        const listNotification = await getListAdminNotification()
        socket.emit('notification',listNotification)
    })
    
    socket.on("disconnect", (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });
httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect DB Successfully"))
  .catch((error) => console.log(error));

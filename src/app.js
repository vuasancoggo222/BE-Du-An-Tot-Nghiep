import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import {
  addNewUser,
  onlineUsers,
  getUser,
  removeUser,
  getUserByRole,
} from "./utils/socketUser";
import "dotenv/config";
import Notification from "./models/notification";
import serviceRouter from "./routes/service";
import authRouter from "./routes/authenticate";
import bookingRouter from "./routes/booking";
import contactRouter from "./routes/contact";
import employeeRouter from "./routes/employee";
import blogRouter from "./routes/blog";
import http from "http";
import { Server } from "socket.io";
import { initializeApp } from "firebase-admin/app";
import BannerRouter from "./routes/banner";
import userRouter from "./routes/user";
import feedbackRouter from "./routes/feedback";
const app = express();
import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";
import jwt from "jsonwebtoken";
import {
  getListAdminNotification,
  getUserListNotification,
  newNotification,
} from "./controllers/notification";
const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET"],
  },
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
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
app.use("/api", blogRouter);

let socketEmitList = false
io.use((socket, next) => {
 
  if (socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, "datn", function (err, decoded) {
      if (err) return next(new Error("Authentication error"));
      socket.decoded = decoded;
      socket.role = decoded.role;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", async (socket) => {
  socket.on("newUser", async (id) => {
    addNewUser(id, socket.id, socket.role);
   ;
  
    const receive = getUser(id);
    console.log(onlineUsers);
    const receiverByRole = getUserByRole(2);
    if(!socketEmitList &&  receiverByRole){
    const listNotification = await getListAdminNotification();
    io.to(receiverByRole.socketId).emit("notification", listNotification);
    socketEmitList = true
    }

    if(receive){
      const userListNotification = await getUserListNotification(id);
    io.to(receive["socketId"]).emit(
      "userListNotification",
      userListNotification
    );
    }
  });
  socket.on("newNotification", async (data) => {
    const notification = {
      bookingId: data.id,
      notificationType: data.type,
      text: data.text,
    };
    await newNotification(notification);
    const sendNotification = await Notification.findOne({
      bookingId: data.id,
    }).exec();
    const receiverByRole = getUserByRole(2);
    if(receiverByRole){
      io.to(receiverByRole.socketId).emit("newNotification", sendNotification);
      const listNotification = await getListAdminNotification();
      io.to(receiverByRole.socketId).emit("notification", listNotification);
    }
  });
  socket.on("newUserNotification", async (data) =>{;
    const notification = {
      bookingId: data.id,
      notificationType: data.type,
      text: data.text,
      userId : data.userId
    };
    await newNotification(notification);
    const sendNotification = await Notification.findOne({
      bookingId: data.id,
    }).exec();
    console.log(sendNotification);
    const receive = getUser(data.id)
    console.log(receive);
    if(receive){
      const userListNotification = await getUserListNotification(id);
      console.log(userListNotification);
      io.to(receive["socketId"]).emit(
      "userListNotification",
      userListNotification
      );
    }
  })
  socket.on("disconnect", (reason) => {
    removeUser(socket.id);
  });
});
httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect DB Successfully"))
  .catch((error) => console.log(error));

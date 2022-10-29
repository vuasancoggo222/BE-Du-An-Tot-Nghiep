import { io } from "../app";

io.on("connection", (socket) => {
    socket.on('abc',(data)=>{
        console.log(data)
    })
    socket.on("disconnect", (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });
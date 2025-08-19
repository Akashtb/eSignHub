export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

  

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    socket.emit("welcome", "Welcome! You are connected to the server 🚀");
  });
};

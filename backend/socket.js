let users = [];

const addUser = (userId,socketId)=>{
  if(!users.some(user=>user.userId === userId)){
    users.push({ userId, socketId });
  }
}

const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
}

const getUser = (recipientUserId) => {
  return users.find(user => user.userId?.userId === recipientUserId);
};


export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      console.log("Current Users:", users);
    })
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      removeUser(socket.id);
    });

    socket.emit("welcome", "Welcome! You are connected to the server 🚀");
  });
};
export { getUser };
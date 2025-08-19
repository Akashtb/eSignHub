import React, { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { selectCurrentRole, selectCurrentUser } from "../redux/auth/AuthSlice";
import { useSelector } from "react-redux";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const userId = useSelector(selectCurrentUser);
  const userType = useSelector(selectCurrentRole);

  useEffect(() => {
    socketRef.current = io("http://localhost:3007");

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);

      socketRef.current.emit("addUser", { userId, userType });
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, userType]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

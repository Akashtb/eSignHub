import React, { createContext, useEffect, useRef} from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io("http://localhost:3007", {
        });

        socketRef.current.on("connect", () => {
            console.log("Socket connected:", socketRef.current.id);
        });

        socketRef.current.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current}}>
            {children}
        </SocketContext.Provider>
    );
};

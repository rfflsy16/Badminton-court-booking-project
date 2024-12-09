import { Server } from "socket.io";
import MessageModel from "../models/message.js";
export const configureSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // User bergabung ke room
        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });

        // Menerima pesan baru
        socket.on("send-message", async ({ roomId, userId, text }) => {
            try {
                const newMessage = await MessageModel.addMessage({
                    userId,
                    roomId,
                    text,
                });

                // Kirim pesan ke semua user di room
                io.to(roomId).emit("receive-message", newMessage);
            } catch (err) {
                console.error("Error sending message:", err);
            }
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};
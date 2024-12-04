import { createServer } from "http";
import { Server } from "socket.io";
import Client from "socket.io-client";
import { jest } from '@jest/globals';  // Pastikan jest diimport dengan benar
import { client, db } from "../config/mongoDB"; // Pastikan path ini sesuai dengan file config Anda

let ioServer, httpServer, clientSocket;

beforeAll(async () => {
    // Set the timeout here, inside beforeAll
    jest.setTimeout(10000); // Increase timeout to 10 seconds

    // Setup HTTP server and Socket.io server
    httpServer = createServer();
    ioServer = new Server(httpServer);

    // Ensure MongoDB is connected
    await client.connect();

    // Start HTTP server
    await new Promise((resolve) => {
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);

            ioServer.on("connection", (socket) => {
                console.log("Client connected");

                socket.on("JOIN_ROOM", async (data) => {
                    const { courtId, userId, adminId } = data;

                    // Find room in MongoDB
                    const room = await db.collection("rooms").findOne({
                        courtId,
                        participants: { $all: [userId, adminId] },
                    });

                    // If room found, join the room
                    if (room) {
                        socket.join(room._id.toString());
                        socket.emit("JOIN_ROOM_SUCCESS", { roomId: room._id });
                    } else {
                        socket.emit("JOIN_ROOM_ERROR", { message: "Room not found" });
                    }
                });

                // Handle message sending and receiving
                socket.on("SEND_MESSAGE", async (data) => {
                    const { roomId, userId, text } = data;

                    const message = {
                        userId,
                        roomId,
                        text,
                        createdAt: new Date(),
                    };

                    // Save message to MongoDB
                    await db.collection("messages").insertOne(message);

                    // Emit message to all participants in the room
                    ioServer.to(roomId).emit("RECEIVE_MESSAGE", message);
                });
            });

            resolve();
        });
    });
});

afterAll(async () => {
    // Ensure clientSocket is initialized before calling disconnect
    if (clientSocket) {
        clientSocket.disconnect();
    }
    if (ioServer) {
        ioServer.close();
    }
    if (httpServer) {
        httpServer.close();
    }
    await client.close();
});

describe("Socket.io Tests", () => {
    it("should join a room successfully", async () => {
        const roomData = {
            courtId: "5f1f1f1f1f1f1f1f1f1f1f1f",
            userId: "5f1f1f1f1f1f1f1f1f1f1f1f",
            adminId: "6f1f1f1f1f1f1f1f1f1f1f1f",
        };

        // Delete old room if exists
        await db.collection("rooms").deleteOne({ _id: roomData.courtId });

        // Insert new room to MongoDB
        await db.collection("rooms").insertOne({
            _id: roomData.courtId,
            courtId: roomData.courtId,
            participants: [roomData.userId, roomData.adminId],
        });

        // Emit JOIN_ROOM event
        clientSocket.emit("JOIN_ROOM", roomData);

        // Wait for the JOIN_ROOM_SUCCESS event and validate response
        await new Promise((resolve, reject) => {
            clientSocket.on("JOIN_ROOM_SUCCESS", (data) => {
                resolve(data);
            });

            // Timeout handler
            setTimeout(() => reject(new Error("Timeout while waiting for JOIN_ROOM_SUCCESS")), 10000);
        });
    });
});

import { db } from "../config/mongoDB.js";
import { ObjectId } from "mongodb";

export default class MessageModel {
    static getCollection() {
        return db.collection("Messages");
    }

    // Menambahkan pesan baru
    static async addMessage({ userId, roomId, text }) {
        const collection = this.getCollection();
        const newMessage = {
            userId: new ObjectId(userId),
            roomId: new ObjectId(roomId),
            text,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newMessage);
        return { ...newMessage, _id: result.insertedId };
    }

    // Mendapatkan pesan berdasarkan roomId dengan pagination
    static async getMessagesByRoomId(roomId, page, limit) {
        const collection = this.getCollection();
        const skip = (page - 1) * limit;

        const messages = await collection
            .find({ roomId: new ObjectId(roomId) })
            .sort({ createdAt: -1 }) // Pesan terbaru lebih dahulu
            .skip(skip)
            .limit(+limit)
            .toArray();

        return messages;
    }
}
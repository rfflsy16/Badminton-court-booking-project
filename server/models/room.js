import { db } from "../config/mongoDB.js";
import { ObjectId } from "mongodb";

export default class RoomModel {
    static getCollection() {
        return db.collection("Rooms");
    }

    // Mendapatkan room berdasarkan courtId dan peserta (userId)
    static async getRoomByCourtAndParticipants(courtId, userId) {
        const collection = this.getCollection();
        return await collection.findOne({
            courtId,
            participants: { $in: [userId] },
        });
    }

    // Menambah room baru
    static async addRoom(courtId, userId, adminId) {
        const collection = this.getCollection();

        const participants = [userId, adminId]; // User dan Admin masuk sebagai participants

        const newRoom = {
            courtId,
            participants,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newRoom);
        return { ...newRoom, _id: result.insertedId };
    }

    // Mendapatkan room berdasarkan ID
    static async getRoomById(roomId) {
        const collection = this.getCollection();
        return await collection.findOne({ _id: new ObjectId(roomId) });
    }

    // Mendapatkan semua room
    static async getRoom() {
        const collection = this.getCollection();
        return await collection.find().toArray();
    }

    // Menghapus room berdasarkan ID
    static async deleteRoomById(roomId) {
        const collection = this.getCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(roomId) });
        return result.deletedCount > 0;
    }
}
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
            participants: { $in: [new ObjectId(userId)] },
        });
    }

    // Menambah room baru
    static async addRoom(courtId, userId, adminId) {
        const collection = this.getCollection();

        const participants = [new ObjectId(userId), new ObjectId(adminId)]; // User dan Admin masuk sebagai participants

        const newRoom = {
            courtId: new ObjectId(courtId),
            participants: [
                new ObjectId(userId),
                new ObjectId(adminId)],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newRoom);
        return { ...newRoom, _id: result.insertedId };
    }

    // Mendapatkan room berdasarkan ID
    static async getRoomById(roomId) {
        const collection = this.getCollection();

        const findRoom = await collection.findOne({ _id: new ObjectId(roomId) });
        if (!findRoom) {
            throw { name: 'NotFound' }
        }

        return findRoom
    }

    static async checkRoom(courtId, userId, adminId){
        const collection = this.getCollection();

        const room = await collection.findOne({
            courtId: new ObjectId(courtId),
            participants: { $all: [new ObjectId(userId), new ObjectId(adminId)] },
        });

        return room
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

    static async findRoom(userId, adminId, courtId) {
        const collection = this.getCollection();
        const room = await collection.findOne({
            courtId: new ObjectId(courtId),
            participants: { 
                $all: [new ObjectId(userId), new ObjectId(adminId)],
                $size: 2
            }
        });
        
        return room
    }
}
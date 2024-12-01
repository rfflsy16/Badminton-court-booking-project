import RoomModel from "../models/room.js";
import { ObjectId } from "mongodb";
export class RoomController {
    // Membuat room baru
    static async createRoom(req, res, next) {
        try {

            // console.log(req.loginInfo, "login info")
            const { courtId } = req.body;

            const { userId } = req.loginInfo; // User yang login
            // console.log(userId, "userr ini yang login")
            const adminId = new ObjectId("6749c89fb1e40e4b8b37de9d");

            // Cek apakah room dengan courtId dan userId sudah ada
            const existingRoom = await RoomModel.getRoomByCourtAndParticipants(courtId, userId);

            if (existingRoom) {
                return res.status(400).json({ message: "Room already exists for this court with the same participants" });
            }

            // Buat room baru jika belum ada
            const newRoom = await RoomModel.addRoom(courtId, userId, adminId);

            res.status(201).json({
                message: "Room created successfully",
                room: newRoom,
            });
        } catch (err) {
            next(err);
        }
    }
    // Mendapatkan room berdasarkan ID
    static async getRoomById(req, res, next) {
        try {
            const { roomId } = req.params;
            console.log(roomId, "ini room id nya")
            const room = await RoomModel.getRoomById(roomId);
            res.status(200).json(room);
        } catch (err) {
            next(err);
        }
    }

    // Mendapatkan semua room
    static async getAllRooms(req, res, next) {
        try {
            const rooms = await RoomModel.getRoom();
            res.status(200).json(rooms);
        } catch (err) {
            next(err);
        }
    }

    // Menghapus room hanya jika admin
    // Menghapus room hanya jika admin
    static async deleteRoom(req, res, next) {
        try {
            const { roomId } = req.params; // Ambil roomId dari URL
            console.log(`Deleting Room with ID: ${roomId}`);

            // Periksa apakah room dengan ID tersebut ada
            const room = await RoomModel.getRoomById(roomId);

            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

            // Hapus room
            const success = await RoomModel.deleteRoomById(roomId);

            if (!success) {
                return res.status(500).json({ message: "Failed to delete room" });
            }

            res.status(200).json({ message: "Room deleted successfully" });
        } catch (err) {
            next(err);
        }
    }

}
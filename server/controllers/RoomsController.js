import RoomModel from "../models/room.js";
import { ObjectId } from "mongodb";
import BuildingModel from "../models/building.js";
import CourtModel from "../models/court.js";
export class RoomController {
    static async createRoom(req, res, next) {
        try {
            const { courtId } = req.body;
            const { userId } = req.loginInfo;

            const building = await CourtModel.findBuildingWithCourt(courtId);
            const id = building.BuildingId
            const adminId = await BuildingModel.readByIdBuilding(id)

            const existingRoom = await RoomModel.getRoomByCourtAndParticipants(courtId, userId);

            if (existingRoom) {
                return res.status(400).json({ message: "Room already exists for this court with the same participants" });
            }

            const newRoom = await RoomModel.addRoom(courtId, userId, adminId.UserId);

            res.status(201).json({
                message: "Room created successfully",
                room: newRoom,
            });
        } catch (err) {
            next(err);
        }
    }

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

    static async getAllRooms(req, res, next) {
        try {
            const rooms = await RoomModel.getRoom();
            res.status(200).json(rooms);
        } catch (err) {
            next(err);
        }
    }

    static async deleteRoom(req, res, next) {
        try {
            const { roomId } = req.params;
            console.log(`Deleting Room with ID: ${roomId}`);

            const room = await RoomModel.getRoomById(roomId);

            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

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
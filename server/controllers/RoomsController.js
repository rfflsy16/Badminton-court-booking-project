import RoomModel from "../models/room.js";
import { ObjectId } from "mongodb";
import BuildingModel from "../models/building.js";
import CourtModel from "../models/court.js";
export class RoomController {
    static async createRoom(req, res, next) {
        try {
            const { courtId } = req.body;
            const { userId } = req.loginInfo;

            if (courtId.length < 24) throw { name: 'InvalidInputID' }

            const building = await CourtModel.findBuildingWithCourt(courtId);
            const id = building.BuildingId
            const adminId = await BuildingModel.readByIdBuilding(id)

            const existingRoom = await RoomModel.getRoomByCourtAndParticipants(courtId, userId);


            if (existingRoom) {
                return res.status(400).json({ message: "Room already exists for this court with the same participants" });
            }

            const newRoom = await RoomModel.addRoom(courtId, userId, adminId.userId);

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
            if (roomId.length < 24) throw { name: 'InvalidInputID' }

            const room = await RoomModel.getRoomById(roomId);
            res.status(200).json(room);
        } catch (err) {
            next(err);
        }
    }

    static async getAllRooms(req, res, next) {
        try {
            const { userId } = req.loginInfo;
            console.log('Current user ID:', userId);

            const rooms = await RoomModel.getRoom();
            console.log('All rooms from DB:', JSON.stringify(rooms, null, 2));

            // Get court details for each room
            const roomsWithDetails = await Promise.all(rooms.map(async (room) => {
                try {
                    console.log(`Processing room ${room._id}:`);
                    console.log('- Room participants:', room.participants);
                    console.log('- Looking for user:', userId);

                    // Convert all participant IDs to strings for comparison
                    const participantIds = room.participants.map(id => id.toString());
                    const isUserParticipant = participantIds.includes(userId.toString());
                    console.log('- Is user a participant?', isUserParticipant);

                    const court = await CourtModel.readCourtById(room.courtId);
                    console.log('- Court details:', court);

                    return {
                        ...room,
                        name: court?.name || `Court ${room.courtId}`,
                        courtDetails: court,
                        isParticipant: isUserParticipant
                    };
                } catch (error) {
                    console.error(`Error processing room ${room._id}:`, error);
                    return {
                        ...room,
                        name: `Court ${room.courtId}`,
                        courtDetails: null,
                        isParticipant: false
                    };
                }
            }));

            // Filter rooms where the current user is a participant
            const userRooms = roomsWithDetails.filter(room => {
                const isParticipant = room.participants.some(participantId =>
                    participantId.toString() === userId.toString()
                );
                console.log(`Room ${room._id} - User ${userId} is participant: ${isParticipant}`);
                return isParticipant;
            });

            console.log('Final rooms being sent:', JSON.stringify(userRooms, null, 2));
            res.status(200).json(userRooms);
        } catch (err) {
            console.error('Error in getAllRooms:', err);
            next(err);
        }
    }

    static async deleteRoom(req, res, next) {
        try {
            const { roomId } = req.params;

            if (roomId.length < 24) throw { name: 'InvalidInputID' }

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

    static async findRoom(req, res, next) {
        try {
            const { userId, adminId, courtId } = req.query;
            const room = await RoomModel.findRoom(userId, adminId, courtId);
            res.status(200).json(room)
        } catch (err) {
            next(err);
        }
    }

}
import RoomModel from "../models/room.js";
import { User } from "../models/user.js";


export const isAdmin = async (req, res, next) => {
    try {
        const { role } = req.loginInfo

        if (role !== 'admin') {
            return res.status(403).json({
                message: 'You are not admin'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const authorization = async (req, res, next) => {
    try {
        const { role, userId } = req.loginInfo;

        if (role !== 'admin') {
            const user = await User.getById(userId)

            if (!user) throw { name: 'Forbidden' }

            const { roomId } = req.params

            const room = await RoomModel.getRoomById(roomId)

            if (!room) throw { name: 'NotFound' }

            console.log(room.participants[0], 'innjnon')

            if (room.participants[0] !== userId) throw { name: 'notUser' }
        }

        next()
    } catch (error) {
        console.error("Authorization Error:", error);
        next(error); // Lempar error ke error handler
    }
};

export const checkRoomAndMessage = async (req, res, next) => {
    try {
        const { userId, role } = req.loginInfo;
        const { roomId } = req.params;

        if (role !== 'admin') {
            const findRoom = await RoomModel.getRoomById(roomId);

            if (!findRoom) {
                return res.status(404).json({ message: "Room not found" });
            }

            const participants = findRoom.participants; // Ambil array participants
            if (participants[0].toString() !== userId.toString()) {
                return res.status(403).json({ message: "You are not a participant in this room" });
            }
        }
        next();
    } catch (error) {
        console.error(error);
        next(error); // Oper error ke middleware error handler
    }
};
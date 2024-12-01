import RoomModel from "../models/room.js";
import { User } from "../models/user.js";


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
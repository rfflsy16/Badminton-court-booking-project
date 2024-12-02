import MessageModel from "../models/message.js";
export class MessageController {
    // Mendapatkan pesan di dalam Room tertentu dengan pagination
    static async getMessage(req, res, next) {
        try {
            const { roomId } = req.params; // Room ID diambil dari query
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            if (!roomId) {
                return res.status(400).json({ message: "Room ID is required" });
            }

            const messages = await MessageModel.getMessagesByRoomId(roomId, page, limit);

            res.status(200).json({
                messages,
                page,
                limit,
                hasMore: messages.length === limit
            });
        } catch (error) {
            next(error);
        }
    }

    // Menambahkan pesan baru
    static async postMessage(req, res, next) {
        try {
            const { roomId } = req.params
            const { text } = req.body;
            const { userId } = req.loginInfo; // User yang login

            if (!roomId || !text) {
                return res.status(400).json({ message: "Room ID and text are required" });
            }

            const newMessage = await MessageModel.addMessage({ userId, roomId, text });

            res.status(201).json(newMessage);
        } catch (error) {
            next(error);
        }
    }
}
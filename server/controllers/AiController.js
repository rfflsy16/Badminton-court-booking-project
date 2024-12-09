import NotificationModel from "../models/notification.js";

export default class AIController {
    static async generateRecommendations(req, res, next) {
        try {

            const notification = await NotificationModel.getNotification()
            res.status(200).json({
                message: "Rekomendasi lapangan yang tersedia:",
                notification,
            });
        } catch (error) {
            console.error("Error di AI:", error.response.data);
            next(error);
        }
    }
}

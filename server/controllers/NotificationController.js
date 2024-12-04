import NotificationModel from "../models/notification.js";
import AIController from "./AiController.js";

export default class NotificationController {
    static async getNotification(req, res, next) {
        try {
            const notifications = await NotificationModel.getCollection().find().toArray();
            res.status(200).json(notifications);
        } catch (error) {
            next(error);
        }
    }

    static async generateAndSaveNotifications(req, res, next) {
        try {
            const { recommendations } = await AIController.generateRecommendations();

            const notificationData = recommendations.map((rec) => ({
                message: `Lapangan "${rec.courtName}" kosong di waktu: ${rec.availableTimes.join(
                    ", "
                )}.`,
                createdAt: new Date(),
            }));

            const collection = NotificationModel.getCollection();
            await collection.insertMany(notificationData);

            res.status(200).json({ message: "Notifikasi berhasil dibuat" });
        } catch (error) {
            console.error("Error pas generate notifikasi:", error);
        }
    }
}

import express from 'express'
import AIController from '../controllers/AiController.js';
import NotificationController from '../controllers/NotificationController.js';

export default function notificationRouter() {
    const router = express.Router()

    router.get("/", NotificationController.getNotification);
    router.post('/', NotificationController.PostNotification)
    router.get('/gemini', AIController.recommendation)

    return router
}
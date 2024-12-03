import express from 'express'
import AIController from '../controllers/AiController';
import NotificationController from '../controllers/NotificationController';

export default function courtRouter() {
    const router = express.Router()

    router.get("/", NotificationController.getNotification);
    router.post('/', NotificationController.PostNotification)
    router.get('/gemini', AIController.recommendation)

    return router
}
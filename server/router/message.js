import express from "express"
import { MessageController } from "../controllers/MessageController.js"
import { checkRoomAndMessage } from "../middlewares/authorization.js"

export default function messageRouter() {
    const router = express.Router()
    router.get("/:roomId", checkRoomAndMessage, MessageController.getMessage)
    router.post("/:roomId", checkRoomAndMessage, MessageController.postMessage)

    return router
}


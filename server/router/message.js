import express from "express"
import { MessageController } from "../controllers/MessageController.js"

export default function messageRouter() {
    const router = express.Router()
    router.get("/:roomId", MessageController.getMessage)
    router.post("/", MessageController.postMessage)

    return router
}


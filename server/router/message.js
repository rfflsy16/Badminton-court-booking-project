import express from "express"
import { MessageController } from "../controllers/MessageController.js"

export const router = express.Router()

router.get("/", MessageController.getMessage)
router.get("/", MessageController.postMessage)

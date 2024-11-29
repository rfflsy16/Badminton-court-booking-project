import express from "express"
import { MessageController } from "../controllers/MessageController"

export const router = express.Router()

router.get("/", MessageController.getMessage)
router.get("/", MessageController.postMessage)

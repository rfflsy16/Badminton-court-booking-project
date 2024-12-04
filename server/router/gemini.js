import express from 'express'

import AIController from "../controllers/AiController.js"

export default function geminiRouter() {
    const router = express.Router()
    router.get('/', AIController.generateRecommendations)

    return router
}


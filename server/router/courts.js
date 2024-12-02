import express from 'express'
import CourtController from '../controllers/CourtController.js'

export default function courtRouter() {
    const router = express.Router()

    router.get("/", CourtController.getAll);
    router.get("/:id", CourtController.getById);
    router.post("/", CourtController.create);
    router.put("/:id", CourtController.update);
    router.delete("/:id", CourtController.delete);
    router.get("/building/:BuildingId", CourtController.getCourtsByBuilding)

    return router
}

import express from "express"
import { BuildingController } from "../controllers/BuildingController.js"
import { isAdmin } from "../middlewares/authorization.js"

export default function buildingRouter() {

    const router = express.Router()

    router.post("/", isAdmin, BuildingController.createBuilding)
    router.get("/", BuildingController.getAllBuildings)
    router.get("/:id", BuildingController.getBuildingById)
    router.delete("/:id", isAdmin, BuildingController.deleteBuilding)
    router.post("/coordinates", BuildingController.findBuildingByCoordinates)

    return router
}

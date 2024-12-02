
import express from "express"
import { BuildingController } from "../controllers/BuildingController.js"
import { isAdmin } from "../middlewares/authorization.js"

export default function buildingRouter() {
    const router = express.Router()

    router.post("/", isAdmin, BuildingController.createBuilding)
    router.get("/", BuildingController.getAllBuildings)
    router.get("/:id", BuildingController.getBuildingById)
    router.put("/:id", BuildingController.updateBuilding)
    router.delete("/:id", BuildingController.deleteBuilding)
    router.get("/near/:deviceId", BuildingController.findNearestBuildings);
    router.post("/coordinates", BuildingController.findBuildingByCoordinates)

    return router
}

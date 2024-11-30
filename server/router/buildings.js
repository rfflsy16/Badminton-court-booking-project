
import express from "express"
import { BuildingController } from "../controllers/BuildingController.js"


export default function buildingRouter() {

    const router = express.Router()

    router.get("/", BuildingController.getAllBuildings)
    router.post("/", BuildingController.createBuilding)
    router.post("/coordinates", BuildingController.findBuildingByCoordinates)
    // router.get("/find-nearest", BuildingController.findBuildingByUserLocation)
    router.get("/:id", BuildingController.getBuildingById)
    router.delete("/:id", BuildingController.deleteBuilding)
    return router;

}

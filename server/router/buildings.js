import express from "express"
import { BuildingController } from "../controllers/BuildingController"

export const router = express.Router()

router.get("/", BuildingController.getBuilding)
router.get("/:id", BuildingController.getBuildingById)
router.post("/", BuildingController.addBuilding)
router.delete("/", BuildingController.deleteBuilding)

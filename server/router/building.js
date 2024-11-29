import express from 'express'
import { BuildingController } from '../controllers/BuildingController.js';

export const buildingRouter = express.Router()

buildingRouter.post("/", BuildingController.createBuilding);

buildingRouter.get("/", BuildingController.getAllBuildings);

buildingRouter.get("/:id", BuildingController.getBuildingById);

buildingRouter.put("/:id", BuildingController.updateBuilding);

buildingRouter.delete("/:id", BuildingController.deleteBuilding);

buildingRouter.post("/:deviceId/nearest", BuildingController.findNearestBuildings);

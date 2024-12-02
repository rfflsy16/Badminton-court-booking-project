import BuildingModel from "../models/building.js";
import { User } from "../models/user.js";

export class BuildingController {
    static async createBuilding(req, res, next) {
        try {
            const { userId } = req.loginInfo
            console.log(userId)
            const newBuilding = await BuildingModel.createNewBuilding(req.body, userId);
            res.status(201).json({
                message: "Building created successfully",
                building: newBuilding,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAllBuildings(req, res, next) {
        try {
            const buildings = await BuildingModel.readBuilding();
            // console.log(buildings, '<<<<<<< ini building model')
            res.status(200).json({ buildings });
        } catch (err) {
            next(err);
        }
    }

    static async getBuildingById(req, res, next) {
        try {
            const { id } = req.params;

            if (id.length < 24) throw { name: 'InvalidInputID' }

            const building = await BuildingModel.readByIdBuilding(id);
            res.status(200).json(building);
        } catch (err) {
            next(err);
        }
    }

    static async findBuildingByCoordinates(req, res, next) {
        try {
            const { longitude, latitude } = req.body;

            if (typeof longitude !== 'number' || typeof latitude !== 'number') {
                return res.status(400).json({ message: "Invalid coordinates" });
            }

            const building = await BuildingModel.findBuildingByCoordinates(longitude, latitude);

            res.status(200).json(building);
        } catch (err) {
            next(err);
        }
    }

    static async updateBuilding(req, res, next) {
        try {
            const { id } = req.params;
            const updatedBuilding = await BuildingModel.updateBuilding(id, req.body);
            res.status(200).json({
                message: "Building updated successfully",
                building: updatedBuilding,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteBuilding(req, res, next) {
        try {
            const { id } = req.params;
            if (id.length !== 24) { // Check if id is a valid ObjectId
                throw { name: "validationErrorId" }; // If not, throw an error       
            }
            await BuildingModel.deleteBuilding(id);
            res.status(200).json({ message: "Building deleted successfully" });
        } catch (err) {
            next(err);
        }
    }

    static async findBuildingByUserLocation(req, res, next) {
        try {
            const { longitude, latitude } = req.query;
            const buildings = await BuildingModel.findBuildingByUserLocation(longitude, latitude);
            res.status(200).json(buildings);
        } catch (err) {
            console.error('Error finding buildings:', err);
            next(err);
        }
    }
}



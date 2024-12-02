import BuildingModel from "../models/building.js";
import { User } from "../models/user.js";

export class BuildingController {
    static async createBuilding(req, res, next) {
        // console.log('masukkkkkk')
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
        // console.log('masullll')
        try {
            const { id } = req.params;

            if (id.length < 24) throw { name: 'InvalidInputID' }

            const building = await BuildingModel.readByIdBuilding(id);
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
            await BuildingModel.deleteBuilding(id);
            res.status(200).json({ message: "Building deleted successfully" });
        } catch (err) {
            next(err);
        }
    }

    static async findNearestBuildings(req, res, next) {
        try {
            const { deviceId } = req.params;
            const user = await User.getByDeviceId(deviceId);
            if (!user || !user.location) {
                return res.status(404).json({ message: "User location not found" });
            }

            const userLocation = user.location.coordinates;

            const buildings = await BuildingModel.findNearestBuildings(userLocation, 1000); // Menggunakan radius 1000 meter
            res.status(200).json(buildings);
        } catch (err) {
            next(err);
        }
    }

    static async findBuildingByCoordinates(req, res, next) {
        // console.log('masullll')
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
}

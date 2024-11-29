import { User } from "../models/user.js";

export class UserController {
    // Login user
    static async login(req, res, next) {
        try {
            const result = await User.login(req.body);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    // Register user
    static async register(req, res, next) {
        try {
            const newUser = await User.register(req.body);
            res.status(201).json({
                message: "Register Successfully",
                newUser,
            });
        } catch (err) {
            next(err);
        }
    }

    // Update lokasi user
    static async updateUserLocation(req, res, next) {
        try {
            const { deviceId, location } = req.body;
            const updatedUser = await User.updateUserLocation(deviceId, location);
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    }

    // Mencari building terdekat berdasarkan deviceId
    static async findNearestBuildingsByDeviceId(req, res, next) {
        try {
            const { deviceId } = req.params;
            const nearestBuildings = await User.findNearestBuildings(deviceId);
            res.status(200).json(nearestBuildings);
        } catch (err) {
            next(err);
        }
    }
}

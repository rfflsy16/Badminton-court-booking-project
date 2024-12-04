import { User } from "../models/user.js";

export class UserController {
    static async login(req, res, next) {
        try {

            const result = await User.login(req.body);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    static async register(req, res, next) {
        try {
            const newUser = await User.register(req.body);
            res.status(201).json({
                message: "Register Successfully"
            });
        } catch (err) {
            next(err);
        }
    }

    static async updateUserLocation(req, res, next) {
        try {
            const { deviceId, location } = req.body;
            const updatedUser = await User.updateUserLocation(deviceId, location);
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    }

    static async findNearestBuildingsByDeviceId(req, res, next) {
        try {
            const { deviceId } = req.params;
            const nearestBuildings = await User.findNearestBuildings(deviceId);
            res.status(200).json(nearestBuildings);
        } catch (err) {
            next(err);
        }
    }

    static async getProfile(req, res, next) {
        try {
            const { userId } = req.loginInfo;
            console.log(userId, "<<<<<<<< ini dari controller")
            const result = await User.getById(userId);

            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}

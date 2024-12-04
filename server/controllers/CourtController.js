import CourtModel from "../models/court.js";

export default class CourtController {
    static async getAll(req, res, next) {
        try {
            const courts = await CourtModel.readCourts();
            res.status(200).json(courts);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            if (id.length < 24) throw { name: 'InvalidInputID' }

            const court = await CourtModel.readCourtById(id);
            res.status(200).json(court);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const court = await CourtModel.createCourt(req.body);
            res.status(201).json(court);

        } catch (error) {
            next(error);
        }
    }


    static async getCourtsByBuilding(req, res, next) {
        try {
            const { BuildingId } = req.params;
            const courts = await CourtModel.findBuildingWithCourt(BuildingId);
            res.status(200).json(courts);
        } catch (error) {
            next(error);
        }
    }
}

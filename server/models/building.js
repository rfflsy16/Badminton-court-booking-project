import { db } from "../config";

export default class BuildingModel {
    static getCollection() {
        return db.collection('Buildings')
    }
}
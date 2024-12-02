import request from 'supertest'
import { app } from '../app'
import BuildingModel from '../models/building'

beforeAll(async () => {

    const collection = BuildingModel.getCollection()



    await collection.insertMany([{
        "name": "GOR Candra Wijaya",
        "address": "Jl. Kebon Jeruk, Tangerang",
        "location": {
            "type": "Point",
            "coordinates": [
                106.735797,
                -6.224493
            ]
        },
        "UserId": {
            "$oid": "6749c89fb1e40e4b8b37de9d"
        },
        "createdAt": {
            "$date": "2024-11-29T10:00:00.000Z"
        },
        "updatedAt": {
            "$date": "2024-11-29T10:00:00.000Z"
        }
    }])
})

afterAll(async () => {
    const collection = BuildingModel.getCollection()
    await collection.deleteMany()
})
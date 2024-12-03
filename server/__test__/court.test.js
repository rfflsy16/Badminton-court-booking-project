import request from 'supertest'
import { app } from '../app'
import BuildingModel from '../models/building'
import CourtModel from '../models/court'
import { User } from '../models/user'
import { hashPassword } from '../helpers/bcrypt'
import { signToken } from '../helpers/jwt'

beforeAll(async () => {
    const userCollection = User.getCollection()
    const buildingCollection = BuildingModel.getCollection()
    const courtCollection = CourtModel.getCollection()

    userCollection.insertMany([
        {
            fullName: 'udinaja',
            email: 'udin@mail.com',
            password: hashPassword('123456'),
            role: 'user'
        },
        {
            fullName: 'udinaja1',
            email: 'admin@mail.com',
            password: hashPassword('123456'),
            role: 'admin'
        }
    ])

    buildingCollection.insertMany([{
        "name": "GOR Candra Wijaya",
        "address": "Jl. Kebon Jeruk, Tangerang",
        "city": "Tangerang",
        "imgUrl": "https://admin.saraga.id/storage/images/1_1707477144.jpeg",
        "location": {
            "type": "Point",
            "coordinates": [
                106.7846567,
                -6.2653276
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
    }, {
        "name": "GOR Bintaro",
        "address": "Jl. Bintaro Utama No.76, Bintaro, Tangerang Selatan",
        "city": "Tangerang Selatan",
        "imgUrl": "https://admin.saraga.id/storage/images/1_1707477144.jpeg",
        "location": {
            "type": "Point",
            "coordinates": [
                106.7909275,
                -6.176278
            ]
        },
        "userId": {
            "$oid": "6749c89fb1e40e4b8b37de9d"
        },
        "createdAt": {
            "$date": "2024-12-02T12:31:36.410Z"
        },
        "updatedAt": {
            "$date": "2024-12-02T12:31:36.410Z"
        }
    }])

    courtCollection.insertMany([{
        "BuildingId": {
            "$oid": "674dff4dc2efa8461625f222"
        },
        "category": "Indoor",
        "type": "Premium",
        "description": "Lapangan bulutangkis indoor premium dengan pencahayaan dan ventilasi yang baik.",
        "startTime": 8,
        "endTime": 22,
        "excludedTime": [
            "11",
            "14"
        ],
        "excludedDate": [
            "2024-12-07"
        ],
        "price": 200000,
        "dp": 100000,
        "location": "Jl. HR. Rasuna Said, Kuningan, Jakarta Selatan",
        "createdAt": {
            "$date": "2024-12-02T22:05:47.984Z"
        },
        "updatedAt": {
            "$date": "2024-12-02T22:05:47.984Z"
        }
    }])
})
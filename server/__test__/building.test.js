import request from 'supertest'
import { app } from '../app'
import BuildingModel from '../models/building'
import { ObjectId } from 'mongodb'
import { signToken, verifyToken } from '../helpers/jwt';

let access_token_admin, access_token_user;
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
    }, {
        "name": "GOR Bintaro",
        "address": "Jl. Bintaro Utama No.76, Bintaro, Tangerang Selatan",
        "location": {
            "type": "Point",
            "coordinates": [
                106.748156,
                -6.269657
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


    const admin = {
        id: new ObjectId,
        email: 'admin@mail.com',
        role: 'admin'
    }

    const user = {
        id: new ObjectId,
        email: 'udin@mail.com',
        role: 'user'
    }

    access_token_admin = signToken(admin)
    access_token_user = signToken(user)
})

afterAll(async () => {
    const collection = BuildingModel.getCollection()
    await collection.deleteMany()
})

describe('POST /buildings', () => {
    describe('POST /buildings - succeed', () => {
        it('should be return an message Building created successfully', async () => {
            const response = await request(app)
                .post('/buildings')
                .send({
                    "name": "GOR Bintaro",
                    "address": "Jl. Bintaro Utama No.76, Bintaro, Tangerang Selatan",
                    "location": {
                        "type": "Point",
                        "coordinates": [106.748156, -6.269657]
                    }
                }
                )
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(201)
            expect(response.body.message).toBe("Building created successfully")
        })
    })
})

describe('GET /buildings', () => {
    describe('GET /buildings - succeed', () => {
        it('should be return data of buildings', async () => {
            const response = await request(app)
                .get('/buildings')
                .set('Authorization', `Bearer ${access_token_user}`)

            expect(response.status).toBe(200)
            expect(response.body.buildings).toBeInstanceOf(Object)
        })
    })
})
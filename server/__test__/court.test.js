import request from 'supertest'
import { app } from '../app'
import BuildingModel from '../models/building'
import CourtModel from '../models/court'
import { User } from '../models/user'
import { hashPassword } from '../helpers/bcrypt'
import { signToken } from '../helpers/jwt'

const userCollection = User.getCollection()
const buildingCollection = BuildingModel.getCollection()
const courtCollection = CourtModel.getCollection()

let dataOfBuilding, access_token_admin, access_token_user, dataOfCourt
beforeAll(async () => {
    await userCollection.insertMany([
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

    await buildingCollection.insertMany([{
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

    const building = await BuildingModel.readBuilding()
    dataOfBuilding = building[0]

    await courtCollection.insertMany([{
        "BuildingId": dataOfBuilding._id,
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
    }, {
        "BuildingId": dataOfBuilding._id,
        "category": "Outdoor",
        "type": "Basic",
        "description": "Lapangan bulutangkis outdoor dengan lapangan rumput yang nyaman untuk permainan kasual.",
        "startTime": 7,
        "endTime": 18,
        "excludedTime": [
            "12",
            "16"
        ],
        "excludedDate": [
            "2024-12-08"
        ],
        "price": 100000,
        "dp": 50000,
        "location": "Jl. HR. Rasuna Said, Kuningan, Jakarta Selatan",
        "createdAt": {
            "$date": "2024-12-02T22:06:48.645Z"
        },
        "updatedAt": {
            "$date": "2024-12-02T22:06:48.645Z"
        }
    }])

    const court = await CourtModel.readCourts()
    dataOfCourt = court[0]

    const users = await userCollection.find().toArray()
    const admin = {
        id: users[0]._id,
        email: 'admin@mail.com',
        role: 'admin'
    }

    const user = {
        id: users[1]._id,
        email: 'udin@mail.com',
        role: 'user'
    }

    access_token_admin = signToken(admin)
    access_token_user = signToken(user)
})

afterAll(async () => {
    await userCollection.deleteMany()
    await buildingCollection.deleteMany()
    await courtCollection.deleteMany()
})

describe('GET /courts', () => {
    describe('GET /courts - succeed', () => {
        it('should be return data of courts', async () => {
            const response = await request(app)
                .get('/courts')
                .set(`Authorization`, `Bearer ${access_token_admin}`)

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
        })
    })
    describe('GET /courts - failed', () => {
        it('should be return an error message because user does not login', async () => {
            const response = await request(app)
                .get('/courts')

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('GET /courts - failed', () => {
        it('should be return an error message because invalid token', async () => {
            const response = await request(app)
                .get('/courts')
                .set(`Authorization`, `Bearer babalbalbala`)
            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
})

// get courts by id
describe('GET /courts/:id', () => {
    describe('GET /courts/:id - succeed', () => {
        it('should be return the detail data of courts', async () => {
            const response = await request(app)
                .get(`/courts/${dataOfCourt._id}`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
        })
    })
    describe('GET /courts/:id - failed', () => {
        it('should be return an error message because user doesnt login', async () => {
            const response = await request(app)
                .get(`/courts/${dataOfCourt._id}`)

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('GET /courts/:id - failed', () => {
        it('should be return an error message because invalid token ', async () => {
            const response = await request(app)
                .get(`/courts/${dataOfCourt._id}`)
                .set('Authorization', `Bearer bjdbwkbd`)
            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('GET /courts/:id - failed', () => {
        it('should be return an error message because the data is not found ', async () => {
            const response = await request(app)
                .get(`/courts/67496558cf13ad22e00d4333`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(404)
            expect(response.body.message).toBe('Cannot find Court')
        })
    })
    describe('GET /courts/:id - failed', () => {
        it('should be return an error message because the params must be 24 character string', async () => {
            const response = await request(app)
                .get(`/courts/67496558cf13ad22e00d`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('input must be a 24 character hex string')
        })
    })
})

describe('POST /courts', () => {
    describe('POST /courts - succeed', () => {
        it('should be return an message Success add new Court', async () => {
            const response = await request(app)
                .post('/courts')
                .send({
                    "BuildingId": dataOfBuilding._id,
                    "category": "Indoor",
                    "type": "Premium",
                    "description": "Lapangan bulutangkis indoor premium dengan pencahayaan dan ventilasi yang baik.",
                    "startTime": 8,
                    "endTime": 22,
                    "excludedTime": ["11", "14"],
                    "excludedDate": ["2024-12-07"],
                    "price": 150000,
                    "dp": 75000
                })
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(201)
            expect(response.body.message).toBe('Success added new Court')
        })
    })
    describe('POST /courts - failed', () => {
        it('should be return an error message because user does not login', async () => {
            const response = await request(app)
                .post('/courts')
                .send({
                    "BuildingId": dataOfBuilding._id,
                    "category": "Indoor",
                    "type": "Premium",
                    "description": "Lapangan bulutangkis indoor premium dengan pencahayaan dan ventilasi yang baik.",
                    "startTime": 8,
                    "endTime": 22,
                    "excludedTime": ["11", "14"],
                    "excludedDate": ["2024-12-07"],
                    "price": 150000,
                    "dp": 75000
                })

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('POST /courts - failed', () => {
        it('should be return an error message because invalid token', async () => {
            const response = await request(app)
                .post('/courts')
                .send({
                    "BuildingId": dataOfBuilding._id,
                    "category": "Indoor",
                    "type": "Premium",
                    "description": "Lapangan bulutangkis indoor premium dengan pencahayaan dan ventilasi yang baik.",
                    "startTime": 8,
                    "endTime": 22,
                    "excludedTime": ["11", "14"],
                    "excludedDate": ["2024-12-07"],
                    "price": 150000,
                    "dp": 75000
                })
                .set('Authorization', `Bearer sndcke `)

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('POST /courts - failed', () => {
        it('should be return an error message because user doesnt complete fill the field', async () => {
            const response = await request(app)
                .post('/courts')
                .send({
                    "BuildingId": dataOfBuilding._id,
                    "category": "Indoor",
                    "type": "Premium",
                    "description": "Lapangan bulutangkis indoor premium dengan pencahayaan dan ventilasi yang baik.",
                    "startTime": 8,
                    "endTime": 22,
                    "excludedTime": ["11", "14"],
                    "excludedDate": ["2024-12-07"],
                    "dp": 75000
                })
                .set('Authorization', `Bearer ${access_token_admin} `)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Please input all of the field')
        })
    })
    describe('POST /courts - failed', () => {
        it('should be return an error message because user doesnt complete fill the field', async () => {
            const response = await request(app)
                .post('/courts')
                .send({
                    "category": "Indoor",
                    "type": "Premium",
                    "description": "Lapangan bulutangkis indoor premium dengan pencahayaan dan ventilasi yang baik.",
                    "startTime": 8,
                    "endTime": 22,
                    "excludedTime": ["11", "14"],
                    "excludedDate": ["2024-12-07"],
                    "price": 150000,
                    "dp": 75000
                })
                .set('Authorization', `Bearer ${access_token_admin} `)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Please input all of the field')
        })
    })
    describe('POST /courts - failed', () => {
        it('should be return an error message because user doesnt complete fill the field', async () => {
            const response = await request(app)
                .post('/courts')
                .send({
                    "BuildingId": dataOfBuilding._id,
                    "category": "Indoor",
                    "type": "Premium",
                    "startTime": 8,
                    "endTime": 22,
                    "excludedTime": ["11", "14"],
                    "excludedDate": ["2024-12-07"],
                    "price": 150000,
                    "dp": 75000
                })
                .set('Authorization', `Bearer ${access_token_admin} `)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Please input all of the field')
        })
    })
})
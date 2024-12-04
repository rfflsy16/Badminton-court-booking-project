import request from 'supertest'
import { app } from '../app.js'
import BuildingModel from '../models/building.js'
import { signToken } from '../helpers/jwt.js';
import { hashPassword } from '../helpers/bcrypt.js';
import { User } from '../models/user.js';
import CourtModel from '../models/court.js';
import RoomModel from '../models/room.js';

const userCollection = User.getCollection()
const buildingCollection = BuildingModel.getCollection()
const courtCollection = CourtModel.getCollection()
const roomcollection = RoomModel.getCollection()


let dataOfCourt, dataOfBuilding, dataOfRoom, access_token_admin, access_token_user
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

    await roomcollection.insertMany([{
        "courtId": dataOfCourt._id,
        "participants": [
            {
                "$oid": "674ddebb50c3ca63a695ef58"
            },
            {
                "$oid": "6749c89fb1e40e4b8b37de9d"
            }
        ],
        "createdAt": {
            "$date": "2024-12-03T02:53:16.455Z"
        },
        "updatedAt": {
            "$date": "2024-12-03T02:53:16.455Z"
        }
    },])

    const room = await RoomModel.getRoom()
    dataOfRoom = room[0]

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
    await roomcollection.deleteMany()
})

// GET /room
describe('GET /room', () => {
    describe('GET /room - succeed', () => {
        it('should be return all of data rooms', async () => {
            const response = await request(app)
                .get('/room')
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
        })
    })
    describe('GET /room - failed', () => {
        it('should be return an error message because user doesnt login', async () => {
            const response = await request(app)
                .get('/room')

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('GET /room - failed', () => {
        it('should be return an error message because invalid token', async () => {
            const response = await request(app)
                .get('/room')
                .set('Authorization', `Bearer kwnoen`)
            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
})

// POST /room
describe('POST /room', () => {
    describe('POST /room - succeed', () => {
        it('should be return an message Succeess create new Room', async () => {
            const response = await request(app)
                .post('/room')
                .send({
                    'courtId': dataOfCourt._id
                })
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(201)
            expect(response.body.message).toBe('Room created successfully')
            expect(response.body.room).toBeInstanceOf(Object)
        })
    })
    describe('POST /room - failed', () => {
        it('should be return an error message because user doesnt login', async () => {
            const response = await request(app)
                .post('/room')
                .send({
                    'courtId': dataOfCourt._id
                })

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('POST /room - failed', () => {
        it('should be return an error message because Invalid token', async () => {
            const response = await request(app)
                .post('/room')
                .send({
                    'courtId': dataOfCourt._id
                })
                .set('Authorization', `Bearer klweferln`)

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('POST /room - failed', () => {
        it('should be return an error message because Invalid token', async () => {
            const response = await request(app)
                .post('/room')
                .send({
                    'courtId': 'kjewnfkjebfkjeb'
                })
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('input must be a 24 character hex string')
        })
    })
})

describe('GET /room/:roomId', () => {
    describe('GET /room/:roomId - succeed', () => {
        it('should be return data of the detail room', async () => {
            const response = await request(app)
                .get(`/room/${dataOfRoom._id}`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
        })
    })
    describe('GET /room/:roomId - failed', () => {
        it('should be return an error message because user doesnt login', async () => {
            const response = await request(app)
                .get(`/room/${dataOfRoom._id}`)

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('GET /room/:roomId - failed', () => {
        it('should be return an error message because invalid token', async () => {
            const response = await request(app)
                .get(`/room/${dataOfRoom._id}`)
                .set('Authorization', `Bearer dknckenkl`)
            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('GET /room/:roomId - failed', () => {
        it('should be return an error message because data is not found', async () => {
            const response = await request(app)
                .get(`/room/aaaaaad97649a501d3123456`)
                .set('Authorization', `Bearer ${access_token_user}`)

            expect(response.status).toBe(404)
            expect(response.body.message).toBe('Data not found')
        })
    })
    describe('GET /room/:roomId - failed', () => {
        it('should be return an error message because invalid input id', async () => {
            const response = await request(app)
                .get(`/room/aaaaaad91`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('input must be a 24 character hex string')
        })
    })
})

describe('DELETE /room/:roomId', () => {
    describe('DELETE /room/:roomId - succeed', () => {
        it('should be return an succeess delete message', async () => {
            const response = await request(app)
                .delete(`/room/${dataOfRoom._id}`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(200)
            expect(response.body.message).toBe('Room deleted successfully')
        })
    })
    describe('DELETE /room/:roomId - failed', () => {
        it('should be return an error message because the room has been deleted or data is not found', async () => {
            const response = await request(app)
                .delete(`/room/${dataOfRoom._id}`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(404)
            expect(response.body.message).toBe('Data not found')
        })
    })
    describe('DELETE /room/:roomId - failed', () => {
        it('should be return an error message because the role of user is not admin', async () => {
            const response = await request(app)
                .delete(`/room/${dataOfRoom._id}`)
                .set('Authorization', `Bearer ${access_token_user}`)
            expect(response.status).toBe(403)
            expect(response.body.message).toBe('You are not admin')
        })
    })
    describe('DELETE /room/:roomId - failed', () => {
        it('should be return an error message because invalid token', async () => {
            const response = await request(app)
                .delete(`/room/${dataOfRoom._id}`)
                .set('Authorization', `Bearer nclenckle`)
            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
})
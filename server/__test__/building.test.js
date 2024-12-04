import request from 'supertest'
import { app } from '../app'
import BuildingModel from '../models/building'
import { signToken } from '../helpers/jwt';
import { User } from '../models/user';
import { hashPassword } from '../helpers/bcrypt';
import CourtModel from '../models/court';
const courtCollection = CourtModel.getCollection()


let access_token_admin, access_token_user;
let dataOfBuilding, dataOfCourt
beforeAll(async () => {
    const collectionBuilding = BuildingModel.getCollection()
    await collectionBuilding.insertMany([{
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

    const userCollection = User.getCollection()
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
    const collectionBuilding = BuildingModel.getCollection()
    await collectionBuilding.deleteMany()


    const collectionUser = User.getCollection()
    await collectionUser.deleteMany()


    await courtCollection.deleteMany()
})

describe('POST /buildings', () => {
    describe('POST /buildings - succeed', () => {
        it('should be return an message Building created successfully', async () => {
            const response = await request(app)
                .post('/buildings')
                .send({
                    "name": "GOR Ciledug",
                    "address": "Jl. HOS Cokroaminoto No.1, Ciledug, Kota Tangerang, Banten 15151",
                    "city": "Tangerang",
                    "imgUrl": "https://admin.saraga.id/storage/images/1_1707477144.jpeg",
                    "location": {
                        "type": "Point",
                        "coordinates": [106.748120, -6.215450]
                    }
                })
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(201)
            expect(response.body.message).toBe("Building created successfully")
        })
    })
    describe('POST /buildings - failed', () => {
        it('should be return an error message because user doesnt complete fill the field', async () => {
            const response = await request(app)
                .post('/buildings')
                .send({
                    "name": "GOR Ciledug",
                    "address": "Jl. HOS Cokroaminoto No.1, Ciledug, Kota Tangerang, Banten 15151",
                    "imgUrl": "https://admin.saraga.id/storage/images/1_1707477144.jpeg",
                    "location": {
                        "type": "Point",
                        "coordinates": [106.748120, -6.215450]
                    }
                })
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe("Please input all of the field")
        })
    })
    describe('POST /buildings - failed', () => {
        it('should be return an error message because user doesnt complete fill the field', async () => {
            const response = await request(app)
                .post('/buildings')
                .send({
                    "name": "GOR Ciledug",
                    "address": "Jl. HOS Cokroaminoto No.1, Ciledug, Kota Tangerang, Banten 15151",
                    "city": "Tangerang",
                    "location": {
                        "type": "Point",
                        "coordinates": [106.748120, -6.215450]
                    }
                })
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe("Please input all of the field")
        })
    })
    describe('POST /buildings - failed', () => {
        it('should be return an error message because user doesnt complete fill the field', async () => {
            const response = await request(app)
                .post('/buildings')
                .send({
                    "name": "GOR Ciledug",
                    "city": "Tangerang",
                    "imgUrl": "https://admin.saraga.id/storage/images/1_1707477144.jpeg",
                    "location": {
                        "type": "Point",
                        "coordinates": [106.748120, -6.215450]
                    }
                })
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe("Please input all of the field")
        })
    })
    describe('POST /buildings - failed', () => {
        it('should be return an error message because user doesnt complete fill the field', async () => {
            const response = await request(app)
                .post('/buildings')
                .send({
                    "address": "Jl. HOS Cokroaminoto No.1, Ciledug, Kota Tangerang, Banten 15151",
                    "city": "Tangerang",
                    "imgUrl": "https://admin.saraga.id/storage/images/1_1707477144.jpeg",
                    "location": {
                        "type": "Point",
                        "coordinates": [106.748120, -6.215450]
                    }
                })
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe("Please input all of the field")
        })
    })
    describe('POST /buildings - failed', () => {
        it('should be return an error message because user doesnt complete fill the field', async () => {
            const response = await request(app)
                .post('/buildings')
                .send({
                    "name": "GOR Ciledug",
                    "address": "Jl. HOS Cokroaminoto No.1, Ciledug, Kota Tangerang, Banten 15151",
                    "city": "Tangerang",
                    "imgUrl": "https://admin.saraga.id/storage/images/1_1707477144.jpeg"
                })
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe("Please input all of the field")
        })
    })
    describe('POST /buildings - failed', () => {
        it('should be return an error message because user doesnt login', async () => {
            const response = await request(app)
                .post('/buildings')
                .send({
                    "name": "GOR Ciledug",
                    "address": "Jl. HOS Cokroaminoto No.1, Ciledug, Kota Tangerang, Banten 15151",
                    "city": "Tangerang",
                    "imgUrl": "https://admin.saraga.id/storage/images/1_1707477144.jpeg",
                    "location": {
                        "type": "Point",
                        "coordinates": [106.748120, -6.215450]
                    }
                })

            expect(response.status).toBe(401)
            expect(response.body.message).toBe("Please login first")
        })
    })
})

// GET /buildings
describe('GET /buildings', () => {
    describe('GET /buildings - succeed', () => {
        it('should be return data of buildings', async () => {
            const response = await request(app)
                .get('/buildings')
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(200)
            expect(response.body.buildings).toBeInstanceOf(Object)
        })
    })
    describe('GET /buildings - failed', () => {
        it('should be return an error message because not authorized', async () => {
            const response = await request(app)
                .get('/buildings')

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('GET /buildings - succeed', () => {
        it('should be return data of buildings', async () => {
            const response = await request(app)
                .get('/buildings')
                .set('Authorization', `Bearer blablaba`)

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
})

// POST / buildings / coordinates
describe('POST /buildings/coordinates', () => {
    describe('POST /buildings/coordinates - succeed', () => {
        it('should be return data of the buildings when the user is around the building radius 5 km', async () => {
            const response = await request(app)
                .post('/buildings/coordinates')
                .set('Authorization', `Bearer ${access_token_admin}`)
                .send({
                    "longitude": 106.7827962,
                    "latitude": -6.2615624
                }
                )

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
        })
    })
    describe('POST /buildings/coordinates - failed', () => {
        it('should be return an error message because user not login', async () => {
            const response = await request(app)
                .post('/buildings/coordinates')
                .send({
                    "longitude": 106.7827962,
                    "latitude": -6.2615624
                }
                )

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('POST /buildings/coordinates - failed', () => {
        it('should be return an error message because invalid token', async () => {
            const response = await request(app)
                .post('/buildings/coordinates')
                .set('Authorization', `Bearer kndoewn`)
                .send({
                    "longitude": 106.7827962,
                    "latitude": -6.2615624
                }
                )

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('POST /buildings/coordinates - failed', () => {
        it('should be return an error message because invalid coordinates', async () => {
            const response = await request(app)
                .post('/buildings/coordinates')
                .set('Authorization', `Bearer ${access_token_admin}`)
                .send({
                    "longitude": 'ahjebjbf',
                    "latitude": 'wjefeb'
                }
                )

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Invalid coordinates')
        })
    })
    describe('POST /buildings/coordinates - failed', () => {
        it('should be return an error message because longitude and latitude is empty', async () => {
            const response = await request(app)
                .post('/buildings/coordinates')
                .set('Authorization', `Bearer ${access_token_admin}`)
                .send()

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Coordinates are required')
        })
    })
})


// GET /buildings by id
describe('GET /buildings/:id', () => {
    describe('GET /buildings/:id - succeed', () => {
        it('should be return the detail building of id what we input', async () => {
            const response = await request(app)
                .get(`/buildings/${dataOfBuilding._id}`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
        })
    })
    describe('GET /buildings/:id - failed', () => {
        it('should be return an error message because users doesnt login', async () => {
            const response = await request(app)
                .get(`/buildings/${dataOfBuilding._id}`)

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('GET /buildings/:id - failed', () => {
        it('should be return an error message because users have invalid token', async () => {
            const response = await request(app)
                .get(`/buildings/${dataOfBuilding._id}`)
                .set('Authorization', 'Bearer bajnkwc')

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('GET /buildings/:id - failed', () => {
        it('should be return an error message because users doesnt input id in the right things', async () => {
            const response = await request(app)
                .get(`/buildings/jkndkjencnew`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('input must be a 24 character hex string')
        })
    })
    describe('GET /buildings/:id - failed', () => {
        it('should be return an error message because users doesnt input id in the right things', async () => {
            const response = await request(app)
                .get(`/buildings/674aaa58cf13ad22aaad3324`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(404)
            expect(response.body.message).toBe('Cannot find GOR')
        })
    })
})

describe('DELETE /buildings', () => {
    describe('DELETE /buildings - succeed', () => {
        it('should be return an message success delete', async () => {
            const response = await request(app)
                .delete(`/buildings/${dataOfBuilding._id}`)
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(200)
            expect(response.body.message).toBe('Building deleted successfully')
        })
    })
    describe('DELETE /buildings - failed', () => {
        it('should be return an error message because user does not login', async () => {
            const response = await request(app)
                .delete(`/buildings/${dataOfBuilding._id}`)

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
    describe('DELETE /buildings - failed', () => {
        it('should be return an error message because user is not admin', async () => {
            const response = await request(app)
                .delete(`/buildings/${dataOfBuilding._id}`)
                .set('Authorization', `Bearer ${access_token_user}`)
            expect(response.status).toBe(403)
            expect(response.body.message).toBe('You are not admin')
        })
    })
    describe('DELETE /buildings - failed', () => {
        it('should be return an error message because data of GOR is not found', async () => {
            const response = await request(app)
                .delete(`/buildings/67496558cf13ad22e00d3324`)
                .set('Authorization', `Bearer ${access_token_admin}`)
            expect(response.status).toBe(404)
            expect(response.body.message).toBe('Cannot find GOR')
        })
    })
})
import request from 'supertest'
import { app } from '../app'
import BuildingModel from '../models/building'
import { ObjectId } from 'mongodb'
import { signToken, verifyToken } from '../helpers/jwt';
import { User } from '../models/user';
import CourtModel from '../models/court';

let access_token_admin, access_token_user;
let verifyToken_admin, verifyToken_user
let dataOfBuilding, dataOfCourt
beforeAll(async () => {

    const buildings = await BuildingModel.readBuilding()

    buildings.map(async (el) => {
        // console.log(el, 'ini di looping')
        dataOfBuilding = await BuildingModel.readByIdBuilding(el._id)
        console.log(dataOfBuilding, "<<<<< ini di looping")
        return dataOfBuilding
    })

    const courts = await CourtModel.readCourts()
    courts.map(async (el) => {
        dataOfCourt = await CourtModel.readCourtById(el._id)
        console.log(dataOfCourt, "<<<<<<< ini di looping courts")
        return dataOfCourt
    })


    const collectionBuilding = BuildingModel.getCollection()
    await collectionBuilding.insertMany([{
        "name": "GOR Candra Wijaya",
        "address": "Jl. Kebon Jeruk, Tangerang",
        "city": "Tangerang",
        "imgUrl": "https://admin.saraga.id/storage/images/1_1707477144.jpeg",
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
        "city": "Tangerang Selatan",
        "imgUrl": "https://admin.saraga.id/storage/images/1_1707477144.jpeg",
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

    console.log(dataOfBuilding, "<<<<< ini di beforeAll")
    // const collectionCourt = CourtModel.getCollection()
    // await collectionCourt.insertMany([{
    //     "BuildingId": `${dataOfBuilding._id}`,
    //     "category": "Indoor",
    //     "type": "Premium",
    //     "description": "Lapangan bulutangkis indoor premium dengan pencahayaan dan ventilasi yang baik.",
    //     "startTime": 8,
    //     "endTime": 22,
    //     "excludedTime": [
    //         "11",
    //         "14"
    //     ],
    //     "excludedDate": [
    //         "2024-12-07"
    //     ],
    //     "price": 200000,
    //     "dp": 100000,
    //     "location": "Jl. HR. Rasuna Said, Kuningan, Jakarta Selatan",
    //     "createdAt": "2024-12-02T22:05:47.984Z",
    //     "updatedAt": "2024-12-02T22:05:47.984Z",
    //     "buildingDetails": [
    //         {
    //             "_id": `${dataOfBuilding._id}`,
    //             "name": `${dataOfBuilding.name}`,
    //             "address": `${dataOfBuilding.address}`,
    //             "city": `${dataOfBuilding.city}`,
    //             "imgUrl": `${dataOfBuilding.imgUrl}`,
    //             "location": {
    //                 "type": "Point",
    //                 "coordinates": [
    //                     dataOfBuilding.location.coordinates[0],
    //                     dataOfBuilding.location.coordinates[1]
    //                 ]
    //             },
    //             "userId": `${verifyToken_admin.userId}`,
    //             "createdAt": `${dataOfBuilding.createdAt}`,
    //             "updatedAt": `${dataOfBuilding.updatedAt}`
    //         }
    //     ]
    // }, {
    //     "BuildingId": `${dataOfBuilding._id}`,
    //     "category": "Outdoor",
    //     "type": "Basic",
    //     "description": "Lapangan bulutangkis outdoor basic dengan pencahayaan dan ventilasi yang baik.",
    //     "startTime": 8,
    //     "endTime": 22,
    //     "excludedTime": [
    //         "11",
    //         "14"
    //     ],
    //     "excludedDate": [
    //         "2024-12-07"
    //     ],
    //     "price": 200000,
    //     "dp": 100000,
    //     "location": "Jl. HR. Rasuna Said, Kuningan, Jakarta Selatan",
    //     "createdAt": "2024-12-02T22:05:47.984Z",
    //     "updatedAt": "2024-12-02T22:05:47.984Z",
    //     "buildingDetails": [
    //         {
    //             "_id": `${dataOfBuilding._id}`,
    //             "name": `${dataOfBuilding.name}`,
    //             "address": `${dataOfBuilding.address}`,
    //             "city": `${dataOfBuilding.city}`,
    //             "imgUrl": `${dataOfBuilding.imgUrl}`,
    //             "location": {
    //                 "type": "Point",
    //                 "coordinates": [
    //                     dataOfBuilding.location.coordinates[0],
    //                     dataOfBuilding.location.coordinates[1]
    //                 ]
    //             },
    //             "userId": `${verifyToken_admin.userId}`,
    //             "createdAt": `${dataOfBuilding.createdAt}`,
    //             "updatedAt": `${dataOfBuilding.updatedAt}`
    //         }
    //     ]
    // }])

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

    // see the payload
    verifyToken_admin = verifyToken(access_token_admin)
    verifyToken_user = verifyToken(access_token_user)
})


afterAll(async () => {
    const collectionBuilding = BuildingModel.getCollection()
    await collectionBuilding.deleteMany()

    const collectionCourt = BuildingModel.getCollection()
    await collectionCourt.deleteMany()

    const collectionUser = User.getCollection()
    await collectionUser.deleteMany()
})

console.log(dataOfBuilding, "<<<<<<<< data of building")

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

// GET /buildings by id
// describe('GET /buildings/:id', () => {
//     describe('GET /buildings/:id - succeed', () => {
//         it('should be return the detail building of id what we input', async () => {
//             const response = await request(app)
//                 .get(`/buildings/${dataOfBuilding._id}`)
//                 .set('Authorization', `Bearer ${access_token_admin}`)

//             expect(response.status).toBe(200)
//             expect(response.body).toBeInstanceOf(Object)
//         })
//     })
//     describe('GET /buildings/:id - failed', () => {
//         it('should be return an error message because users doesnt login', async () => {
//             const response = await request(app)
//                 .get(`/buildings/${dataOfBuilding._id}`)

//             expect(response.status).toBe(401)
//             expect(response.body.message).toBe('Please login first')
//         })
//     })
//     describe('GET /buildings/:id - failed', () => {
//         it('should be return an error message because users have invalid token', async () => {
//             const response = await request(app)
//                 .get(`/buildings/${dataOfBuilding._id}`)
//                 .set('Authorization', 'Bearer bajnkwc')

//             expect(response.status).toBe(401)
//             expect(response.body.message).toBe('Please login first')
//         })
//     })
//     describe('GET /buildings/:id - failed', () => {
//         it('should be return an error message because users doesnt input id in the right things', async () => {
//             const response = await request(app)
//                 .get(`/buildings/jkndkjencnew`)
//                 .set('Authorization', `Bearer ${access_token_admin}`)

//             expect(response.status).toBe(400)
//             expect(response.body.message).toBe('input must be a 24 character hex string')
//         })
//     })
//     describe('GET /buildings/:id - failed', () => {
//         it('should be return an error message because users doesnt input id in the right things', async () => {
//             const response = await request(app)
//                 .get(`/buildings/67496558cf13ad22e00d3324`)
//                 .set('Authorization', `Bearer ${access_token_admin}`)

//             expect(response.status).toBe(404)
//             expect(response.body.message).toBe('Cannot find GOR')
//         })
//     })
// })

// describe('DELETE /buildings', () => {
//     describe('DELETE /buildings - succeed', () => {
//         it('should be return an message success delete', async () => {
//             const response = await request(app)
//                 .delete(`/buildings/${dataOfBuilding._id}`)
//                 .set('Authorization', `Bearer ${access_token_admin}`)

//             expect(response.status).toBe(200)
//             expect(response.body.message).toBe('Building deleted successfully')
//         })
//     })
//     describe('DELETE /buildings - failed', () => {
//         it('should be return an error message because user does not login', async () => {
//             const response = await request(app)
//                 .delete(`/buildings/${dataOfBuilding._id}`)

//             expect(response.status).toBe(401)
//             expect(response.body.message).toBe('Please login first')
//         })
//     })
//     describe('DELETE /buildings - failed', () => {
//         it('should be return an error message because user is not admin', async () => {
//             const response = await request(app)
//                 .delete(`/buildings/${dataOfBuilding._id}`)
//                 .set('Authorization', `Bearer ${access_token_user}`)
//             expect(response.status).toBe(403)
//             expect(response.body.message).toBe('U are not admin')
//         })
//     })
//     describe('DELETE /buildings - failed', () => {
//         it('should be return an error message because data of GOR is not found', async () => {
//             const response = await request(app)
//                 .delete(`/buildings/67496558cf13ad22e00d3324`)
//                 .set('Authorization', `Bearer ${access_token_admin}`)
//             expect(response.status).toBe(404)
//             expect(response.body.message).toBe('Cannot find GOR')
//         })
//     })
// })

// POST /buildings/coordinates
// describe('POST /buildings/coordinates', () => {
//     describe('POST /buildings/coordinates - succeed', () => {
//         it('should be return data of the buildings when the user is around the building radius 5 km', async () => {
//             const response = await request(app)
//                 .post('/buildings/coordinates')
//                 .set('Authorization', `Bearer ${access_token_admin}`)
//                 .send({
//                     "longitude": dataOfBuilding.location.coordinates[0],
//                     "latitude": dataOfBuilding.location.coordinates[1]
//                 }
//                 )

//             // console.log(dataOfBuilding.location.coordinates[1], "<<<< dii testing")
//             expect(response.status).toBe(200)
//             expect(response.body).toBeInstanceOf(Object)
//         })
//     })
// })


// GET /courts
describe('GET /courts', () => {
    describe('GET /courts - succeed', () => {
        it('should be return data of courts include building', async () => {
            const response = await request(app)
                .get('/courts')
                .set('Authorization', `Bearer ${access_token_admin}`)

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
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
    describe('GET /courts - succeed', () => {
        it('should be return an error message because invalid token', async () => {
            const response = await request(app)
                .get('/courts')
                .set('Authorization', `Bearer blbalbal`)

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please login first')
        })
    })
})

// // GET /courts by id
// describe('GET /courts/:id', () => {
//     describe('GET /courts/:id - succeed', async () => {
//         const response = await request(app)
//             .get(`/courts/${dataOfCourt._id}`)
//             .set('Authorization', `Bearer ${access_token_admin}`)

//         expect(response.status).toBe(200)
//         expect(response.body).toBeInstanceOf(Object)
//     })
// })
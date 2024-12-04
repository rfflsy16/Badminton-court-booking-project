import request from 'supertest'
import { app } from '../app.js'
import BuildingModel from '../models/building.js'
import { User } from '../models/user.js'
import CourtModel from '../models/court.js'
import RoomModel from '../models/room.js'
import MessageModel from '../models/message.js'
import BookingModel from '../models/booking.js'
import PaymentModel from '../models/payment.js'

import { hashPassword } from '../helpers/bcrypt.js'
import { signToken } from '../helpers/jwt'


const userCollection = User.getCollection()
const buildingCollection = BuildingModel.getCollection()
const courtCollection = CourtModel.getCollection()
const roomcollection = RoomModel.getCollection()
const messageCollection = MessageModel.getCollection()
const bookingCollection = BookingModel.getCollection()
const paymentCollection = PaymentModel.getCollection()

let access_token_admin, access_token_user, dataOfBuilding, dataOfCourt, dataOfRoom, dataOfMessage, dataOfBooking, dataOfPayment
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

    await messageCollection.insertMany([{
        "userId": {
            "$oid": "6749c89fb1e40e4b8b37de9d"
        },
        "roomId": dataOfRoom._id,
        "text": "ini test dari della",
        "createdAt": {
            "$date": "2024-12-03T03:00:58.819Z"
        },
        "updatedAt": {
            "$date": "2024-12-03T03:00:58.819Z"
        }
    }])

    const message = await MessageModel.getMessagesByRoomId(dataOfRoom._id)
    dataOfMessage = message[0]

    await bookingCollection.insertMany([{
        "userId": {
            "$oid": "6749c89fb1e40e4b8b37de9d"
        },
        "courtId": dataOfCourt._id,
        "date": "2024-12-11",
        "selectedTime": [
            10
        ],
        "paymentType": "fullpayment",
        "price": 200000,
        "totalPrice": 200000,
        "statusBooking": "pending",
        "createdAt": {
            "$date": "2024-12-03T09:53:10.739Z"
        },
        "updatedAt": {
            "$date": "2024-12-03T09:53:10.739Z"
        }
    }])


    const booking = await BookingModel.read()
    dataOfBooking = booking[0]

    await paymentCollection.insertMany([{
        "username": "mamang",
        "BookingId": dataOfBooking._id,
        "type": "dp",
        "amount": 100000,
        "status": "paid",
        "createdAt": {
            "$date": "2024-12-03T10:40:09.239Z"
        },
        "updatedAt": {
            "$date": "2024-12-03T10:42:53.411Z"
        }
    }])

    const payment = await PaymentModel.readPayment()
    dataOfPayment = payment[0]

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
    await messageCollection.deleteMany()
    await bookingCollection.deleteMany()
    await paymentCollection.deleteMany()
})

describe('POST /complete-payment', () => {
    // describe('POST /complete-payment - succeed', () => {
    //     it('should be return result of payment', async () => {
    //         const response = await request(app)
    //             .post(`/complete-payment`)
    //             .send({
    //                 bookingId: `${dataOfBooking._id}`
    //             })
    //         expect(response.status).toBe(201)
    //         expect(response.body.message).toBe('')
    //     })
    // })
    describe('POST /complete-payment - failed', () => {
        it('should be return result of payment', async () => {
            const response = await request(app)
                .post(`/complete-payment`)
                .send({
                    bookingId: `nkjwencnelkc`
                })
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('input must be a 24 character hex string')
        })
    })
    describe('POST /complete-payment - failed', () => {
        it('should be return result of payment', async () => {
            const response = await request(app)
                .post(`/complete-payment`)
                .send({
                    bookingId: `123456789123456789123456`
                })
            expect(response.status).toBe(404)
            expect(response.body.message).toBe('Booking not found')
        })
    })
})
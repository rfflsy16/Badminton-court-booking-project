// const request = require('supertest')
// const app = require('../app')
// const { User } = require('../models/user')


import request from 'supertest'
import { app } from '../app'
import { User } from '../models/user'


// beforeAll(async () => {
// })

afterAll(async () => {
    const collection = User.getCollection()

    await collection.deleteMany()
})

describe('POST /register', () => {
    describe('POST /register -succeed', () => {
        it('should be return an message Register Successfully', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    fullName: 'udinaja',
                    email: 'udin@mail.com',
                    password: '123456'
                })

            expect(response.status).toBe(201)
            expect(response.body.message).toBe('Register Successfully')
        })
    })
    describe('POST /register -failed', () => {
        it('should be return an error message', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    fullName: 'udinaja',
                    email: 'udin@mail.com',
                    password: '123456'
                })

            expect(response.status).toBe(201)
            expect(response.body.message).toBe('Register Successfully')
        })
    })
})
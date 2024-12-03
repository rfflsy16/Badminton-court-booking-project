// const request = require('supertest')
// const app = require('../app')
// const { User } = require('../models/user')
import request from 'supertest'
import { app } from '../app'
import { User } from '../models/user'

// beforeAll(async () => {
// })

// afterAll(async () => {
//     const collection = User.getCollection()

//     await collection.deleteMany()
// })

describe('POST /register', () => {
    describe('POST /register -succeed', () => {
        it('should be return an message Register Successfully', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    fullName: 'udinaja',
                    email: 'udin@mail.com',
                    password: '123456',
                    role: 'user'
                })

            expect(response.status).toBe(201)
            expect(response.body.message).toBe('Register Successfully')
        })
    })
    describe('POST /register -succeed', () => {
        it('should be return an message Register Successfully', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    fullName: 'udinaja',
                    email: 'admin@mail.com',
                    password: '123456',
                    role: 'admin'
                })

            expect(response.status).toBe(201)
            expect(response.body.message).toBe('Register Successfully')
        })
    })
    describe('POST /register -failed', () => {
        it('should be return an error message because email must be unique', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    fullName: 'udinaja',
                    email: 'udin@mail.com',
                    password: '123456'
                })

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Email already exists')
        })
    })
    describe('POST /register -failed', () => {
        it('should be return an error message because password is empty', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    fullName: 'udinaja',
                    email: 'udin@mail.com',
                    password: ''
                })

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Please input all of the field')
        })
    })
    describe('POST /register -failed', () => {
        it('should be return an error message because email is empty', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    fullName: 'udinaja',
                    email: '',
                    password: '123456'
                })

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Please input all of the field')
        })
    })
    describe('POST /register -failed', () => {
        it('should be return an error message because fullName is empty', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    fullName: '',
                    email: 'mamang@mail.com',
                    password: '123456'
                })

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Please input all of the field')
        })
    })
})

describe('POST /login', () => {
    describe('POST /login - succeed', () => {
        it('should be return an access_token and message Login successful', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'udin@mail.com',
                    password: '123456'
                })

            expect(response.status).toBe(200)
            expect(response.body.message).toBe('Login successful')
        })
    })
    describe('POST /login - failed', () => {
        it('should be return an error message because email or password is invalid', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'udin@mail.com',
                    password: '1234567'
                })

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Invalid email or password')
        })
    })
    describe('POST /login - failed', () => {
        it('should be return an error message because email or password is invalid', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: '',
                    password: '123456'
                })

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please input email or password')
        })
    })
    describe('POST /login - failed', () => {
        it('should be return an error message because email or password is invalid', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'udin@mail.com',
                    password: ''
                })

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Please input email or password')
        })
    })
})
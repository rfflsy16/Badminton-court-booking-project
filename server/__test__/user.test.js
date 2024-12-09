
import request from 'supertest'
import { app } from '../app'
import { User } from '../models/user'
import { beforeAll } from '@jest/globals'
import { hashPassword } from '../helpers/bcrypt'
import { signToken } from '../helpers/jwt'


let access_token_admin, access_token_user
beforeAll(async () => {
    const userCollection = User.getCollection()
    await userCollection.insertMany([
        {
            fullName: 'anjay',
            email: 'admin-tangerang@mail.com',
            password: hashPassword('123456'),
            role: 'user',
            deviceId: 'abcd'
        },
        {
            fullName: 'udinaja1',
            email: 'admin@mail.com',
            password: hashPassword('123456'),
            role: 'admin',
            deviceId: 'abcd'
        }
    ])

    const users = await userCollection.find().toArray()
    const admin = {
        id: users[0]._id,
        email: 'admin-tangerang@mail.com',
    }

    const user = {
        id: users[1]._id,
        email: 'anjay@mail.com',
        role: 'user'
    }

    access_token_admin = signToken(admin)
    access_token_user = signToken(user)
})

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
                    email: 'adminanjay@mail.com',
                    password: '123456',
                    role: 'admin',
                    deviceId: 'abcds'
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
                    email: 'adminanjay@mail.com',
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

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Please input all of the field')
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

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Please input all of the field')
        })
    })
})

describe('GET /profile', () => {
    it('should return user profile when authenticated', async () => {
        const response = await request(app)
            .get('/profile')
            .set('Authorization', `Bearer ${access_token_admin}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('fullName');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('role');
    });

    it('should return Unauthorized error when token is missing', async () => {
        const response = await request(app).get('/profile');

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Please login first');
    });
});

const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET

export const signToken = (payload) => {
    return jwt.sign(payload, secretKey)
}

export const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}
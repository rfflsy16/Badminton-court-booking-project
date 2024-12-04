import { verifyToken } from "../helpers/jwt.js";
import { User } from "../models/user.js";

export const authentication = async (req, res, next) => {

    try {
        const { authorization } = req.headers

        if (!authorization) {
            throw { name: "Unauthorized" }
        }

        const access_token = authorization.split(' ')[1]

        const payload = verifyToken(access_token)
        

        const user = await User.findByEmail(payload.email)


        if (!user) throw { name: "Unauthorized" }

        req.loginInfo = {
            userId: user._id,
            username: user.fullName,
            email: user.email,
            role: user.role
        }

        next()

    } catch (error) {
        next(error)
    }
}
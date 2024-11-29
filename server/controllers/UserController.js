import { User } from "../models/user.js"

export class userController {
    static async login(req, res, next) {
        try {

            const result = await User.login(req.body)
            res.status(200).json(result)
        } catch (error) {

        }
    }

    static async register(req, res, next) {
        try {
            const newUser = await User.register(req.body)
            res.status(201).json({
                message: "Register Successfully",
                newUser
            })
        } catch (error) {
            next(error)
        }
    }
}

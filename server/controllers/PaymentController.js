import PaymentModel from "../models/payment";


export class PaymentController {
    static async getPaymentByUserId(req, res, next) {
        try {
            const payments = await PaymentModel.readPayment()

            res.status(200).json({
                payments
            })
        } catch (error) {

        }
    }

    static async addPayment(req, res, next) {
        try {
            const { username } = req.loginInfo
            const newPayment = await PaymentModel.createNewPayment(req.body, username)
            res.status(201).json({
                newPayment
            })
        } catch (error) {

        }
    }
}
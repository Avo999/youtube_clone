import Subscribers from "../models/Subscriber";
import HttpError from "http-errors";
import User from "../models/User";



class UserActions {
    static subscribe = async (req, res, next) => {
        try {
            const subscriber = await User.findOne({
                where: {
                    id: req.userId
                }
            });

            const subscribed = await Subscribers.findOne({
                where: {
                    $and: [
                        {userId: req.params.id},
                        {email: subscriber.email},
                    ]
                }
            })

            if (!subscriber) {
                throw HttpError(404, "User not found!!!")
            }

            if (!subscribed) {
                await Subscribers.create({
                    email: subscriber.email,
                    userId: req.params.id
                })
            }
            res.json({
                status: "ok"
            })
        } catch (e) {
            next(e)
        }
    }

    static unSubscribe = async (req, res, next) => {
        try {

            const user = await User.findOne({
                where: {
                    id: req.userId
                }
            })

            if (!user) {
                throw HttpError(404, "User not found!!!")
            }

            const subscriber = await Subscribers.findOne({
                where: {
                    $and: [
                        {userId: req.params.id},
                        {email: user.email}
                    ]
                }
            })
            
            if (!subscriber) {
                throw HttpError(404, "Not found!!!")  
            }
            
            await Subscribers.destroy({
                where: {
                    userId: req.userId,
                    email: user.email
                }
            })

            res.json("Success")
        } catch (e){
            next(e)
        }
    }
}

export default UserActions;
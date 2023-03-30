import Helpers from "../services/Helpers";
import User from "../models/User";
import jwt from 'jsonwebtoken';
import HttpError from "http-errors";


class UserController {

    static userRegister = async (req, res, next) => {
        try {
            const {name, email, password} = req.body;
            const activationCode = Helpers.randomString(9);
            const user = await User.create({
                name,
                email,
                password,
                activationCode
            });

            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.SECRET_KEY);
            res.json({
                user,
                token
            })
        } catch (e) {
            next(e);
        }
    }
    static userLogin = async (req, res, next) => {
        try{
            const { email, password } = req.body;

            const user = await User.findOne({
                where: {
                    email,
                    password: User.passHash(password)
                }
            });

            if (!user) {
                throw HttpError(404, 'User not found!!!');
            }

            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.SECRET_KEY)

            res.cookie("access_cookie", token, {
                httponly: true
            }).status(200).json(user)



        } catch (e) {
            next(e);
        }
    }
    static updateUser = async (req, res, next) => {
        try {
            const {userId, file} = req

            const { name, email } = req.body;

            const user = await User.findOne({
                where: {
                    id: userId
                }
            });

           
            if (!user) {
                throw HttpError(422, 'Error');
            }

            user.set({
                name,
                email,
                // image: file.filename
            });
            
            await user.save();

            res.json({
                status: "ok",
                userId
            })
        } catch (e) {
            next(e)
        }
    }
    static deleteUser = async (req, res, next) => {
        if (+req.params.id === req.userId) {
            try {
                await User.destroy(
                    {
                        where: {
                            id : req.params.id
                        }
                    }
                )

                res.json({
                    status: "ok",
                    message: "User has been deleted successfully."
                })

            } catch (e) {
                next(e)
            }
        } else {
            return next(HttpError(403, "You can delete only your account!!!"))
        }
    }
    static getUser = async (req, res, next) => {
        try {
            const {id} = req.params;
 
            const user = await User.findOne({
                where: {
                    id
                }
            })

            if (!user) {
                throw HttpError(404, "User not found!!!")
            }

            res.json({
                user
            })

        } catch (e) {
            next(e)
        }
    }
   
}



export default UserController;
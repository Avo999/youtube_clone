import jwt from "jsonwebtoken";
import HttpError from "http-errors";



const checkAuth = (req, res, next) => {

    const token = req.cookies.access_cookie;
    
    if (token){
        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            req.userId = decoded.id;
            next()
        } catch (e) {
            next(HttpError(403, 'Not Allowed', e))
        }
    } else {
        next(HttpError(401, 'Not Authorization'))
    }


}

export default checkAuth;
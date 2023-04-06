import api from './index';
import {IUserLogin, IUserSignUp} from "../types/UserTypes";
import {PartialNull} from "../types";

class UserRequests {
    static getOneUser<T>(id: number) {
        return api.get<T>(`/user/find/${id}`)
    }
    static userLogin(values: IUserLogin)  {
        return api.post('/user/login', values);
    }

    static userCreate(values: IUserSignUp) {
        return api.post("/user/register", values)
    }
    static userGoogleAuth(values: PartialNull<IUserSignUp>) {
        return api.post('/user/google', values)
    }
}

export default UserRequests;
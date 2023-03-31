import api from './index';

class UserRequests {
    static getOneUser<T>(id: number) {
        return api.get<T>(`/user/find/${id}`)
    }
}

export default UserRequests;
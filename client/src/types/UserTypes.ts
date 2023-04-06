export interface IUserLogin {
    email: string,
    password: string
}

export interface IUserSignUp {
    name: string
    email: string,
    password: string,
    image?: string
}
export interface IUser {
    id: number,
    name: string,
    email: string,
    image: string,
    createdAt?: Date,
    updatedAt?: Date
}
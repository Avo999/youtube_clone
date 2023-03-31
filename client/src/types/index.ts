export interface IVideo {
    id: number,
    title: string,
    desc: string,
    imageUrl: string,
    videoUrl: string,
    views: number,
    createdAt: string,
    updatedAt: Date,
    userId: number
}
export interface IUser {
    id: number,
    name: string,
    email: string,
    image: string,
    createdAt?: Date,
    updatedAt?: Date
}
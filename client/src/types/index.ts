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


export type Partial<T> = {
    [P in keyof T]? : T[P]
}

export type PartialNull<T> = {
    [P in keyof T]?: T[P] | null
}

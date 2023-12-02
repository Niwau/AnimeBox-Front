export interface ErrorResponse {
  error: string
}

export interface Children {
  children: React.ReactNode
}

export interface IList {
  id: number
  name: string
  animes: IAnime[]
}

export interface IAnime {
  name: string
  sinopsis: string
  image: string
  id: number
}

export interface IComment {
  id: number;
  author: string;
  comment: string;
  author_id: number;
}

export interface IUser {
  name: string;
  email: string;
  role: 'ADMIN' | 'NORMAL',
  id: number;
}
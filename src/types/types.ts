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

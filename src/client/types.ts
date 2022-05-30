export interface Config {
  api_url: string
  token?: string
  plant_per_page: number
  months: string[]
}

export interface PlayersResponse {
  ret: Player[]
}

export interface Player {
  id?: number
  owner?: number
  firstname?: string
  lastname?: string
  country?: string
  birthdate?: Date
  teams?: number[]
}

export interface User {
  login: string
  password: string
}

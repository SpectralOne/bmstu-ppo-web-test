import API from '../API'
import { User } from '../types'

export class AuthService {
  static login(options?: User): Promise<string> {
    return API.post("/user/login", options)
  }

  static logout(): Promise<boolean> {
    return API.post("user/logout").then(() => true).catch(() => false)
  }
}

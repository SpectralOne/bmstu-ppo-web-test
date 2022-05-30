import API from '../API'
import { User } from '../types'

export class AuthService {
  static login(options?: User): Promise<string> {

    return API.post("/user/login", options)
      .then((response: any) => response)
      .catch(() => "")
  }
}

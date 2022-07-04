import { Authentication } from '@/application/usecases/authentication/authentication'
import { AuthenticationModel } from '@/application/usecases/authentication/authentication-model'

class UserAuthentication implements Authentication {
  async auth (authentication: AuthenticationModel): Promise<string> {
    return 'access_token'
  }
}

export { UserAuthentication }

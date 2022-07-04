import { Authentication } from '@/application/usecases/authentication/authentication'

class UserAuthentication implements Authentication {
  async auth (email: string, password: string): Promise<string> {
    return 'access_token'
  }
}

export { UserAuthentication }

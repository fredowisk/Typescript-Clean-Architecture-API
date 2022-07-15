import { Authentication } from '@/application/usecases/account/authentication/authentication'
import { AuthenticationParams } from '@/application/usecases/account/authentication/authentication-model'

const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return Promise.resolve('access_token')
    }
  }

  return new AuthenticationStub()
}

export { mockAuthentication }

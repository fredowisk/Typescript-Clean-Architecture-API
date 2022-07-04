import { Authentication } from '@/application/usecases/authentication/authentication'
import { AuthenticationModel } from '@/application/usecases/authentication/authentication-model'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'

class UserAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const user = await this.loadAccountByEmailRepository.load(
      authentication.email
    )

    if (!user) return null

    return 'access_token'
  }
}

export { UserAuthentication }

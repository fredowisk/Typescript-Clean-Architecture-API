import { Authentication } from '@/application/usecases/authentication/authentication'
import { AuthenticationModel } from '@/application/usecases/authentication/authentication-model'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'

class UserAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const user = await this.loadAccountByEmailRepository.load(
      authentication.email
    )

    if (!user) return null

    const isEqual = await this.hashComparer.compare(
      authentication.password,
      user.password
    )

    if (!isEqual) return null

    return 'access_token'
  }
}

export { UserAuthentication }

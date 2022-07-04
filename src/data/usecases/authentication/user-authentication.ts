import { Authentication } from '@/application/usecases/authentication/authentication'
import { AuthenticationModel } from '@/application/usecases/authentication/authentication-model'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { TokenGenerator } from '@/data/protocols/criptography/token-generator'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/update-access-token-repository'

class UserAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
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

    const accessToken = await this.tokenGenerator.generate(user.id)

    await this.updateAccessTokenRepository.update(accessToken, user.id)

    return accessToken
  }
}

export { UserAuthentication }

import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  TokenGenerator,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from './user-authentication-protocols'

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

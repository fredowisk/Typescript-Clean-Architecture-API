import {
  Authentication,
  AuthenticationParams,
  HashComparer,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from './user-authentication-protocols'

class UserAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationParams): Promise<string> {
    const user = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    )

    if (!user) return null

    const isEqual = await this.hashComparer.compare(
      authentication.password,
      user.password
    )

    if (!isEqual) return null

    const accessToken = this.encrypter.encrypt(user.id)

    await this.updateAccessTokenRepository.updateAccessToken(accessToken, user.id)

    return accessToken
  }
}

export { UserAuthentication }

import {
  Decrypter,
  LoadAccountByTokenRepository,
  LoadAccountByToken,
  AccountModel
} from './db-load-account-by-token-protocols'

class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const decriptedToken = await this.decrypter.decrypt(accessToken)

    if (!decriptedToken) return null

    const account = await this.loadAccountByTokenRepository.loadByToken(
      accessToken,
      role
    )

    if (!account) return null

    return account
  }
}

export { DbLoadAccountByToken }

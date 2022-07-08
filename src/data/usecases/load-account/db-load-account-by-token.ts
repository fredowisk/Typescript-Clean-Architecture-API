import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { LoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'
import { AccountModel } from '../add-account/db-add-account-protocols'

class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}

export { DbLoadAccountByToken }

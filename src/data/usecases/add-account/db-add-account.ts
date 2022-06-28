import { AddAccount, AddAccountModel } from '../../../presentation/controllers/signup/signup-protocols'
import { Encrypter } from '../../protocols/encrypter'

class DbAddAccount implements AddAccount {
  constructor (readonly encrypter: Encrypter) {
  }

  async add (account: AddAccountModel): Promise<void> {
    await this.encrypter.encrypt(account.password)
  }
}

export { DbAddAccount }

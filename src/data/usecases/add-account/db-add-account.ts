import { AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'

class DbAddAccount implements AddAccount {
  constructor (readonly encrypter: Encrypter) {
  }

  async add (account: AddAccountModel): Promise<void> {
    await this.encrypter.encrypt(account.password)
  }
}

export { DbAddAccount }

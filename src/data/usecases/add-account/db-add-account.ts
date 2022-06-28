import {
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Encrypter
} from './db-add-account-protocols'

class DbAddAccount implements AddAccount {
  constructor (
    readonly encrypter: Encrypter,
    readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<void> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add(Object.assign({}, account, { password: hashedPassword }))
  }
}

export { DbAddAccount }

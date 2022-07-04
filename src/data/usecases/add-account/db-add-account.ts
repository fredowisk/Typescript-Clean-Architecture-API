import {
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Hasher
} from './db-add-account-protocols'

class DbAddAccount implements AddAccount {
  constructor (
    readonly hasher: Hasher,
    readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<void> {
    const hashedPassword = await this.hasher.hash(account.password)
    await this.addAccountRepository.add(Object.assign({}, account, { password: hashedPassword }))
  }
}

export { DbAddAccount }

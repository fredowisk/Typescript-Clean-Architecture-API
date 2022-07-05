import {
  LoadAccount,
  LoadAccountModel,
  LoadAccountRepository,
  Hasher
} from './db-add-account-protocols'

class DbLoadAccount implements LoadAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly LoadAccountRepository: LoadAccountRepository
  ) {}

  async Load (account: LoadAccountModel): Promise<void> {
    const hashedPassword = await this.hasher.hash(account.password)
    await this.LoadAccountRepository.Load(Object.assign({}, account, { password: hashedPassword }))
  }
}

export { DbLoadAccount }

import {
  AddAccount,
  AddAccountParams,
  AddAccountRepository,
  Hasher
} from './db-add-account-protocols'

class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountParams): Promise<void> {
    const hashedPassword = await this.hasher.hash(account.password)
    const isSaved = await this.addAccountRepository.add(
      Object.assign({}, account, { password: hashedPassword })
    )

    if (isSaved === null) return isSaved
  }
}

export { DbAddAccount }

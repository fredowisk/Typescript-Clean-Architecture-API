import { AddAccountParams } from '@/application/usecases/account/add-account/add-account-model'
import { AddAccountRepository } from '@/data/protocols/db/account-repository/add-account-repository'

const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountParams): Promise<void> {
      return Promise.resolve(null)
    }
  }

  return new AddAccountRepositoryStub()
}

export { mockAddAccountRepository }

import { LoadAccountByEmailRepository } from '@/data/protocols/db/account-repository/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account/account'
import { mockAccountModel } from '../../models/account/mock-account'

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
  implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

export { mockLoadAccountByEmailRepository }

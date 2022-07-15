import { LoadAccountByTokenRepository } from '@/data/protocols/db/account-repository/load-account-by-token-repository'
import { AccountModel } from '@/domain/models/account/account'
import { mockAccountModel } from '../../models/account/mock-account'

const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub
  implements LoadAccountByTokenRepository {
    async loadByToken (
      accessToken: string,
      role?: string
    ): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }

  return new LoadAccountByTokenRepositoryStub()
}

export { mockLoadAccountByTokenRepository }

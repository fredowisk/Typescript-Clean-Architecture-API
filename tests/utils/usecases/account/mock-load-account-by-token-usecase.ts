import { AccountModel } from '@/domain/models/account/account'
import { LoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'
import { mockAccountModel } from '../../models/account/mock-account'

const mockLoadAccountByTokenUseCase = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }

  return new LoadAccountByTokenStub()
}

export { mockLoadAccountByTokenUseCase }

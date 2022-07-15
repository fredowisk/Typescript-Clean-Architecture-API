import { UpdateAccessTokenRepository } from '@/data/protocols/db/account-repository/update-access-token-repository'

const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (token: string, id: string): Promise<void> {
      return Promise.resolve(null)
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

export { mockUpdateAccessTokenRepository }

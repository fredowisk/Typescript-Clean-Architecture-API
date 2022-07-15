import { LogErrorRepository } from '@/data/protocols/db/log-repository/log-error-repository'

const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      return Promise.resolve(null)
    }
  }

  return new LogErrorRepositoryStub()
}

export { mockLogErrorRepository }

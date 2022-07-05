import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { ErrorMongoRepository } from '@/infra/database/mongodb/log-repository/log-mongo-repository'

describe('Log Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await Promise.all([MongoHelper.disconnect(), MongoHelper.clear('logs')])
  })

  const sut = new ErrorMongoRepository()

  test('Should save the error stack and return nothing', async () => {
    const fakeStack = 'any_stack'
    const spyAccountRepository = jest.spyOn(sut, 'log')
    await sut.log(fakeStack)

    expect(spyAccountRepository).toHaveBeenCalledWith('any_stack')
  })

  test('Should return the quantity of logs in the collection', async () => {
    const logsCollection = await MongoHelper.getCollection('logs')
    const logCount = await logsCollection.countDocuments()

    expect(logCount).toBe(1)
  })
})

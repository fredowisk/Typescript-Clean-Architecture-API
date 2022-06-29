import { MongoHelper } from '../../../../../src/infra/database/mongodb/helpers/mongo-helper'
import { AccountMongoRepository } from '../../../../../src/infra/database/mongodb/account-repository/account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clear('accounts')
  })

  test('Should return nothing on success', async () => {
    const sut = new AccountMongoRepository()
    const spyAccountRepository = jest.spyOn(sut, 'add')
    await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(spyAccountRepository).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })
})

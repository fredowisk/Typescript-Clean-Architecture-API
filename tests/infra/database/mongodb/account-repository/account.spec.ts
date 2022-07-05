import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clear('accounts')
  })

  const sut = new AccountMongoRepository()

  const fakeAccount = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }

  test('Should return nothing if add succeeds', async () => {
    const spyAccountRepository = jest.spyOn(sut, 'add')
    const account = await sut.add(fakeAccount)

    expect(spyAccountRepository).toHaveBeenCalledWith(fakeAccount)
    expect(account).toBeFalsy()
  })

  test('Should return an account if loadByEmail succeeds', async () => {
    const spyAccountRepository = jest.spyOn(sut, 'add')
    await sut.add(fakeAccount)
    const { email } = fakeAccount
    const account = await sut.loadByEmail(email)

    expect(spyAccountRepository).toHaveBeenCalledWith(email)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })

  test('Should return null if loadByEmail returns null', async () => {
    const { email } = fakeAccount
    const account = await sut.loadByEmail(email)

    expect(account).toBeFalsy()
  })

  test('Should update account accessToken if updateAccessToken succeeds', async () => {
    await sut.add(fakeAccount)
    const { email } = fakeAccount
    const account = await sut.loadByEmail(email)
    expect(account.accessToken).toBeFalsy()

    await sut.updateAccessToken(account.id, 'any_token')

    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})

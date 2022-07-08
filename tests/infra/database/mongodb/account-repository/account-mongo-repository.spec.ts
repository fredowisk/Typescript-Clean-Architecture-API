import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account-mongo-repository'

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

  describe('add()', () => {
    test('Should return nothing if add succeeds', async () => {
      const spyAccountRepository = jest.spyOn(sut, 'add')
      const account = await sut.add(fakeAccount)

      expect(spyAccountRepository).toHaveBeenCalledWith(fakeAccount)
      expect(account).toBeFalsy()
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account if loadByEmail succeeds', async () => {
      const spyLoadByEmailRepository = jest.spyOn(sut, 'loadByEmail')
      await sut.add(fakeAccount)
      const { email } = fakeAccount
      const account = await sut.loadByEmail(email)

      expect(spyLoadByEmailRepository).toHaveBeenCalledWith(email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null if loadByEmail returns null', async () => {
      const { email } = fakeAccount
      const account = await sut.loadByEmail(email)

      expect(account).toBeFalsy()
    })
  })

  describe('loadByToken()', () => {
    const accessToken = 'any_token'

    test('Should call loadByToken without role and return an account', async () => {
      const spyLoadByTokenRepository = jest.spyOn(sut, 'loadByToken')

      const accountCollection = await MongoHelper.getCollection('accounts')
      await accountCollection.insertOne({ ...fakeAccount, accessToken })
      const account = await sut.loadByToken(accessToken)

      expect(spyLoadByTokenRepository).toHaveBeenCalledWith(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should call loadByToken with role and return an account', async () => {
      const role = 'any_role'
      const spyLoadByTokenRepository = jest.spyOn(sut, 'loadByToken')

      const accountCollection = await MongoHelper.getCollection('accounts')
      await accountCollection.insertOne({ ...fakeAccount, accessToken, role })
      const account = await sut.loadByToken(accessToken, role)

      expect(spyLoadByTokenRepository).toHaveBeenCalledWith(accessToken, role)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null if loadByToken returns null', async () => {
      const account = await sut.loadByToken(accessToken)

      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken', () => {
    test('Should update account accessToken if updateAccessToken succeeds', async () => {
      await sut.add(fakeAccount)
      const { email } = fakeAccount
      const account = await sut.loadByEmail(email)
      expect(account.accessToken).toBeFalsy()

      await sut.updateAccessToken('any_token', account.id)
      const newAccount = await sut.loadByEmail(email)
      expect(newAccount).toBeTruthy()
      expect(newAccount.accessToken).toBe('any_token')
    })
  })
})

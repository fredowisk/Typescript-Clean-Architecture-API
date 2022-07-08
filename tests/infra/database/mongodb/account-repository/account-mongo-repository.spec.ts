import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account-mongo-repository'
import { Collection } from 'mongodb'
import { AccountModel } from 'domain/models/account'

describe('Account Mongo Repository', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    accountCollection = await MongoHelper.getCollection('accounts')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clear('accounts')
  })

  const sut = new AccountMongoRepository()

  const fakeAccount: any = {
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
      const { email } = fakeAccount
      await accountCollection.insertOne(fakeAccount)
      const account = await sut.loadByEmail(email)

      expect(spyLoadByEmailRepository).toHaveBeenCalledWith(email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null if loadByEmail returns null', async () => {
      const account = await sut.loadByEmail(fakeAccount.email)

      expect(account).toBeFalsy()
    })
  })

  describe('loadByToken()', () => {
    const accessToken = 'any_token'

    test('Should call loadByToken without role and return an account', async () => {
      const spyLoadByTokenRepository = jest.spyOn(sut, 'loadByToken')

      await accountCollection.insertOne({ ...fakeAccount, accessToken })
      const account = await sut.loadByToken(accessToken)

      expect(spyLoadByTokenRepository).toHaveBeenCalledWith(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should call loadByToken with role and return an account', async () => {
      const role = 'any_role'
      const spyLoadByTokenRepository = jest.spyOn(sut, 'loadByToken')

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
      await accountCollection.insertOne(fakeAccount)
      const { _id: id } = fakeAccount

      await sut.updateAccessToken('any_token', id)

      const newAccount = await accountCollection.findOne<AccountModel>({
        _id: id
      })

      expect(newAccount).toBeTruthy()
      expect(newAccount.accessToken).toBe('any_token')
    })
  })
})

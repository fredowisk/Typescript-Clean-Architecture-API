import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account-mongo-repository'
import { Collection, ObjectId, Document } from 'mongodb'
import { AccountModel } from '@/domain/models/account/account'
import { mockAddAccountParams } from '@/tests/utils/index'

describe('Account Mongo Repository', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    accountCollection = await MongoHelper.getCollection('accounts')
  })

  beforeEach(async () => {
    await MongoHelper.clear('accounts')
  })

  const sut = new AccountMongoRepository()

  const fakeAccountParams = mockAddAccountParams()

  describe('add()', () => {
    test('Should return nothing if add succeeds', async () => {
      const spyAccountRepository = jest.spyOn(sut, 'add')
      const account = await sut.add(fakeAccountParams)

      expect(spyAccountRepository).toHaveBeenCalledWith(fakeAccountParams)
      expect(account).toBeFalsy()
    })

    test('Should return null if add fails', async () => {
      const collection = {
        insertOne: () => {
          return { acknowledged: false, insertedId: 0 }
        }
      }

      jest
        .spyOn(MongoHelper, 'getCollection')
        .mockResolvedValueOnce(collection as unknown as Collection<Document>)

      const account = await sut.add(fakeAccountParams)

      expect(account).toBeNull()
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account if loadByEmail succeeds', async () => {
      const spyLoadByEmailRepository = jest.spyOn(sut, 'loadByEmail')
      await accountCollection.insertOne(fakeAccountParams)
      const account = await sut.loadByEmail(fakeAccountParams.email)

      expect(spyLoadByEmailRepository).toHaveBeenCalledWith(
        fakeAccountParams.email
      )
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should return null if loadByEmail returns null', async () => {
      const account = await sut.loadByEmail(fakeAccountParams.email)

      expect(account).toBeNull()
    })
  })

  describe('loadByToken()', () => {
    const accessToken = 'any_token'

    test('Should call loadByToken without role and return an account', async () => {
      const spyLoadByTokenRepository = jest.spyOn(sut, 'loadByToken')

      await accountCollection.insertOne({ ...fakeAccountParams, accessToken })
      const account = await sut.loadByToken(accessToken)

      expect(spyLoadByTokenRepository).toHaveBeenCalledWith(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })

    test('Should call loadByToken with correct values', async () => {
      const role = 'admin'
      const spyLoadByTokenRepository = jest.spyOn(sut, 'loadByToken')

      await accountCollection.insertOne({
        ...fakeAccountParams,
        accessToken,
        role
      })
      await sut.loadByToken(accessToken, role)

      expect(spyLoadByTokenRepository).toHaveBeenCalledWith(accessToken, role)
    })

    test('Should return null when call loadByToken with an invalid role', async () => {
      const role = 'admin'
      await accountCollection.insertOne({ ...fakeAccountParams, accessToken })
      const account = await sut.loadByToken(accessToken, role)

      expect(account).toBeNull()
    })

    test('Should return null if loadByToken returns null', async () => {
      const account = await sut.loadByToken(accessToken)

      expect(account).toBeNull()
    })

    test('Should call loadByToken and return an account if user role is admin', async () => {
      const role = 'admin'

      await accountCollection.insertOne({
        ...fakeAccountParams,
        accessToken,
        role
      })
      const account = await sut.loadByToken(accessToken)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })
  })

  describe('updateAccessToken', () => {
    test('Should update account accessToken if updateAccessToken succeeds', async () => {
      const { insertedId } = await accountCollection.insertOne(
        fakeAccountParams
      )

      const id = new ObjectId(insertedId) as unknown as string

      await sut.updateAccessToken('any_token', id)

      const newAccount = await accountCollection.findOne<AccountModel>({
        _id: id
      })

      expect(newAccount).toBeTruthy()
      expect(newAccount.accessToken).toBe('any_token')
    })
  })
})

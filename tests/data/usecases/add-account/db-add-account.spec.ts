import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import {
  mockHasher,
  mockAddAccountParams,
  mockAddAccountRepository
} from '@/tests/utils'

const hasherStub = mockHasher()
const addAccountRepositoryStub = mockAddAccountRepository()
const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
const accountData = mockAddAccountParams()

describe('DbAddAccount Use case', () => {
  test('Should call Hasher with correct password', async () => {
    const hashSpy = jest.spyOn(hasherStub, 'hash')

    await sut.add(accountData)
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw an Error if Hasher throws an Error', async () => {
    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error())

    const newAccountPromise = sut.add(accountData)
    await expect(newAccountPromise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(accountData)

    const hashedAccount = { ...accountData }
    hashedAccount.password = 'hashed_password'

    expect(addAccountSpy).toHaveBeenCalledWith(hashedAccount)
  })

  test('Should throw an Error if AddAccountRepository throws an Error', async () => {
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error())

    const newAccountPromise = sut.add(accountData)
    await expect(newAccountPromise).rejects.toThrow()
  })
})

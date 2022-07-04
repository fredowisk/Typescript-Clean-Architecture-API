import { AddAccountModel, AddAccountRepository, Hasher } from '@/data/usecases/add-account/db-add-account-protocols'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'

class HasherStub implements Hasher {
  async hash (password: string): Promise<string> {
    return await Promise.resolve('hashed_password')
  }
}

class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<void> {

  }
}

const hasherStub = new HasherStub()
const addAccountRepositoryStub = new AddAccountRepositoryStub()
const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)

const accountData = {
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const hashSpy = jest.spyOn(hasherStub, 'hash')

    await sut.add(accountData)
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw an Error if Hasher throws an Error', async () => {
    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(Promise.reject(new Error()))

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
      .mockReturnValueOnce(Promise.reject(new Error()))

    const newAccountPromise = sut.add(accountData)
    await expect(newAccountPromise).rejects.toThrow()
  })
})

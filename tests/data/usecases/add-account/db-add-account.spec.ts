import { AddAccountModel, AddAccountRepository, Encrypter } from '../../../../src/data/usecases/add-account/db-add-account-protocols'
import { DbAddAccount } from '../../../../src/data/usecases/add-account/db-add-account'

class EncrypterStub implements Encrypter {
  async encrypt (password: string): Promise<string> {
    return await Promise.resolve('hashed_password')
  }
}

class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<void> {

  }
}

const encrypterStub = new EncrypterStub()
const addAccountRepositoryStub = new AddAccountRepositoryStub()
const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw an Error if Encrypter throws an Error', async () => {
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const newAccountPromise = sut.add(accountData)
    await expect(newAccountPromise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('Should throw an Error if AddAccountRepository throws an Error', async () => {
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const newAccountPromise = sut.add(accountData)
    await expect(newAccountPromise).rejects.toThrow()
  })
})

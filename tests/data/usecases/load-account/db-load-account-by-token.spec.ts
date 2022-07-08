import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { DbLoadAccountByToken } from '@/data/usecases/load-account/db-load-account-by-token'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account-repository/load-account-by-token-repository'
import { AccountModel } from 'domain/models/account'

describe('DbLoadAccountByToken Use case', () => {
  const fakeAccount = {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'hashed_password'
  }

  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return Promise.resolve('any_value')
    }
  }

  class LoadAccountByTokenRepositoryStub
  implements LoadAccountByTokenRepository {
    async loadByToken (
      accessToken: string,
      role?: string
    ): Promise<AccountModel> {
      return Promise.resolve(fakeAccount)
    }
  }

  const decrypterStub = new DecrypterStub()
  const loadAccountByTokenRepositoryStub =
    new LoadAccountByTokenRepositoryStub()

  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  )

  const accessToken = 'access_token'
  const role = 'any_role'

  test('Should call Decrypter with correct value', async () => {
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load(accessToken, role)

    expect(decryptSpy).toHaveBeenCalledWith(accessToken)
  })

  test('Should return null if Decrypter returns null', async () => {
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockResolvedValueOnce(Promise.resolve(null))

    const account = await sut.load(accessToken, role)

    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const loadSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')

    await sut.load(accessToken, role)

    expect(loadSpy).toHaveBeenCalledWith(accessToken, role)
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockResolvedValueOnce(Promise.resolve(null))

    const account = await sut.load(accessToken, role)

    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const account = await sut.load(accessToken, role)

    expect(account).toEqual(fakeAccount)
  })

  test('Should throw an Error if LoadAccountByTokenRepository throws an Error', async () => {
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockResolvedValueOnce(Promise.reject(new Error()))

    const promise = sut.load(accessToken, role)

    await expect(promise).rejects.toThrow()
  })

  test('Should throw an Error if Decrypter throws an Error', async () => {
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockResolvedValueOnce(Promise.reject(new Error()))

    const promise = sut.load(accessToken, role)

    await expect(promise).rejects.toThrow()
  })
})

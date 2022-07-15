import { DbLoadAccountByToken } from '@/data/usecases/account/load-account/db-load-account-by-token'
import {
  mockAccountModel,
  mockLoadAccountByTokenRepository,
  mockDecrypter
} from '@/tests/utils'

describe('DbLoadAccountByToken Use case', () => {
  const fakeAccount = mockAccountModel()

  const decrypterStub = mockDecrypter()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()

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
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(null)

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
      .mockResolvedValueOnce(null)

    const account = await sut.load(accessToken, role)

    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const account = await sut.load(accessToken, role)

    expect(account).toEqual(fakeAccount)
  })

  test('Should throw an Error if LoadAccountByTokenRepository throws an Error', async () => {
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.load(accessToken, role)

    await expect(promise).rejects.toThrow()
  })

  test('Should throw an Error if Decrypter throws an Error', async () => {
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockRejectedValueOnce(new Error())

    const promise = sut.load(accessToken, role)

    await expect(promise).rejects.toThrow()
  })
})

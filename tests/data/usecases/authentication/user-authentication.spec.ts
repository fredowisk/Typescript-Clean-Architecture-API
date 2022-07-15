import { UserAuthentication } from '@/data/usecases/account/authentication/user-authentication'
import {
  mockAccountModel,
  mockLoadAccountByEmailRepository,
  mockHashComparer,
  mockEncrypter,
  mockUpdateAccessTokenRepository
} from '@/tests/utils'

describe('Authentication', () => {
  const { id, email, password } = mockAccountModel()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new UserAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    await sut.auth({
      email,
      password
    })
    expect(loadSpy).toHaveBeenCalledWith(email)
  })

  test('Should throw an error if LoadAccountByEmailRepository fails', async () => {
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockRejectedValueOnce(new Error())

    const promise = sut.auth({
      email,
      password
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository return null', async () => {
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(null)

    const accessToken = await sut.auth({
      email,
      password
    })

    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')

    await sut.auth({
      email,
      password
    })

    expect(compareSpy).toHaveBeenCalledWith(password, 'any_password')
  })

  test('Should throw an error if HashComparer fails', async () => {
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error())

    const promise = sut.auth({
      email,
      password
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should return null HashComparer returns false', async () => {
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)

    const acessToken = await sut.auth({
      email,
      password
    })

    expect(acessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.auth({
      email,
      password
    })

    expect(encryptSpy).toBeCalledWith(id)
  })

  test('Should throw an Error Encrypter fails', async () => {
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.auth({
      email,
      password
    })

    await expect(promise).rejects.toThrow()
  })

  test('Should return a Token on success', async () => {
    const accessToken = await sut.auth({
      email,
      password
    })

    expect(accessToken).toBe('hashed_id')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const updateSpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      'updateAccessToken'
    )
    await sut.auth({
      email,
      password
    })

    expect(updateSpy).toHaveBeenCalledWith('hashed_id', id)
  })

  test('Should throw an Error if UpdateAccessTokenRepository fails', async () => {
    jest
      .spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
      .mockRejectedValueOnce(new Error())

    const promise = sut.auth({
      email,
      password
    })

    await expect(promise).rejects.toThrow()
  })
})

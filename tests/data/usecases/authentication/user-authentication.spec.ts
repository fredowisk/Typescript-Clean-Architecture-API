import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/update-access-token-repository'
import { UserAuthentication } from '@/data/usecases/authentication/user-authentication'
import { AccountModel } from '@/domain/models/account'

describe('Authentication', () => {
  const fakeAccount: AccountModel = {
    id: '1',
    name: 'Fred',
    email: 'fred@gmail.com',
    password: '123'
  }

  class LoadAccountByEmailRepositoryStub
  implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return Promise.resolve(fakeAccount)
    }
  }

  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return Promise.resolve('hashed_id')
    }
  }

  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update (token: string, id: string): Promise<void> {
      return Promise.resolve()
    }
  }

  const loadAccountByEmailRepositoryStub =
    new LoadAccountByEmailRepositoryStub()
  const hashComparerStub = new HashComparerStub()
  const encrypterStub = new EncrypterStub()
  const updateAccessTokenRepositoryStub = new UpdateAccessTokenRepositoryStub()
  const sut = new UserAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    const { email, password } = fakeAccount
    await sut.auth({
      email,
      password
    })
    expect(loadSpy).toHaveBeenCalledWith(email)
  })

  test('Should throw an error if LoadAccountByEmailRepository fails', async () => {
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const { email, password } = fakeAccount
    const promise = sut.auth({
      email,
      password
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository return null', async () => {
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(null)

    const { email, password } = fakeAccount
    const accessToken = sut.auth({
      email,
      password
    })

    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')

    const { email, password } = fakeAccount
    await sut.auth({
      email,
      password
    })

    expect(compareSpy).toHaveBeenCalledWith(password, 'hashed_password')
  })

  test('Should throw an error if HashComparer fails', async () => {
    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const { email, password } = fakeAccount
    const promise = sut.auth({
      email,
      password
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should return null HashComparer returns false', async () => {
    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false))

    const { email, password } = fakeAccount
    const acessToken = await sut.auth({
      email,
      password
    })

    expect(acessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const { id, email, password } = fakeAccount
    await sut.auth({
      email,
      password
    })

    expect(encryptSpy).toBeCalledWith(id)
  })

  test('Should throw an Error Encrypter fails', async () => {
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const { email, password } = fakeAccount
    const promise = sut.auth({
      email,
      password
    })

    await expect(promise).rejects.toThrow()
  })

  test('Should return a Token on success', async () => {
    const { email, password } = fakeAccount
    const accessToken = await sut.auth({
      email,
      password
    })

    expect(accessToken).toBe('access_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')
    const { id, email, password } = fakeAccount
    await sut.auth({
      email,
      password
    })

    expect(updateSpy).toHaveBeenCalledWith('access_token', id)
  })

  test('Should throw an Error if UpdateAccessTokenRepository fails', async () => {
    jest.spyOn(updateAccessTokenRepositoryStub, 'update').mockReturnValueOnce(Promise.reject(new Error()))
    const { email, password } = fakeAccount
    const promise = sut.auth({
      email,
      password
    })

    await expect(promise).rejects.toThrow()
  })
})

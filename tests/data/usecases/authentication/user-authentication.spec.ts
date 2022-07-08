import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account-repository/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account-repository/update-access-token-repository'
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
    async loadByEmail (email: string): Promise<AccountModel> {
      return Promise.resolve(fakeAccount)
    }
  }

  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  class EncrypterStub implements Encrypter {
    encrypt (id: string): string {
      return 'hashed_id'
    }
  }

  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (token: string, id: string): Promise<void> {
      return Promise.resolve(null)
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
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const { email, password } = fakeAccount
    await sut.auth({
      email,
      password
    })
    expect(loadSpy).toHaveBeenCalledWith(email)
  })

  test('Should throw an error if LoadAccountByEmailRepository fails', async () => {
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
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
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(null)

    const { email, password } = fakeAccount
    const accessToken = await sut.auth({
      email,
      password
    })

    expect(accessToken).toBe(null)
  })

  test('Should call HashComparer with correct values', async () => {
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')

    const { email, password } = fakeAccount
    await sut.auth({
      email,
      password
    })

    expect(compareSpy).toHaveBeenCalledWith(password, '123')
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
      .mockImplementationOnce(() => { throw new Error() })
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

    expect(accessToken).toBe('hashed_id')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    const { id, email, password } = fakeAccount
    await sut.auth({
      email,
      password
    })

    expect(updateSpy).toHaveBeenCalledWith('hashed_id', id)
  })

  test('Should throw an Error if UpdateAccessTokenRepository fails', async () => {
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(Promise.reject(new Error()))
    const { email, password } = fakeAccount
    const promise = sut.auth({
      email,
      password
    })

    await expect(promise).rejects.toThrow()
  })
})

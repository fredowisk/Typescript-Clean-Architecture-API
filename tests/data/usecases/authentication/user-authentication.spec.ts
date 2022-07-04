import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { TokenGenerator } from '@/data/protocols/criptography/token-generator'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
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

  class TokenGeneratorStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return Promise.resolve('hashed_id')
    }
  }

  const loadAccountByEmailRepositoryStub =
    new LoadAccountByEmailRepositoryStub()
  const hashComparerStub = new HashComparerStub()
  const tokenGeneratorStub = new TokenGeneratorStub()
  const sut = new UserAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub
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

  test('Should call TokenGenerator with correct id', async () => {
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    const { id, email, password } = fakeAccount
    await sut.auth({
      email,
      password
    })

    expect(generateSpy).toBeCalledWith(id)
  })

  test('Should throw an Error TokenGenerator fails', async () => {
    jest
      .spyOn(tokenGeneratorStub, 'generate')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const { email, password } = fakeAccount
    const promise = sut.auth({
      email,
      password
    })

    await expect(promise).rejects.toThrow()
  })
})

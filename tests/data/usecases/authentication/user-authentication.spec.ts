import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository'
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

  const loadAccountByEmailRepositoryStub =
    new LoadAccountByEmailRepositoryStub()
  const sut = new UserAuthentication(loadAccountByEmailRepositoryStub)

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
})

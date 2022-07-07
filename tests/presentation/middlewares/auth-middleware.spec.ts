import { HttpRequest } from '@/presentation/protocols'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from 'application/usecases/load-account/load-account-by-token'

describe('Auth Middleware', () => {
  const fakeAccount: AccountModel = {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    password: 'hashed_password'
  }

  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(fakeAccount)
    }
  }

  const loadAccountByTokenStub = new LoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub)

  const httpRequest: HttpRequest = {
    headers: {}
  }

  test('Should return 403 if there is no x-access-token in headers', async () => {
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const loadAccountSpy = jest.spyOn(loadAccountByTokenStub, 'load')

    httpRequest.headers = {
      'x-access-token': 'any_token'
    }

    await sut.handle(httpRequest)

    expect(loadAccountSpy).toHaveBeenCalledWith(
      httpRequest.headers['x-access-token']
    )
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})

import { HttpRequest } from '@/presentation/protocols'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { AccountModel } from '@/domain/models/account'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account-repository/load-account-by-token-repository'

describe('Auth Middleware', () => {
  class LoadAccountByTokenStub implements LoadAccountByTokenRepository {
    async load (token: string): Promise<AccountModel> {
      return Promise.resolve(null)
    }
  }

  const loadAccountByTokenStub = new LoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub)

  test('Should return 403 if there is no x-access-token in headers', async () => {
    const httpRequest: HttpRequest = {
      headers: {}
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const loadAccountSpy = jest.spyOn(loadAccountByTokenStub, 'load')

    const httpRequest: HttpRequest = {
      headers: {
        'x-access-token': 'any_token'
      }
    }

    await sut.handle(httpRequest)

    expect(loadAccountSpy).toHaveBeenCalledWith(
      httpRequest.headers['x-access-token']
    )
  })
})

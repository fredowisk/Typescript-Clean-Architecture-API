import { HttpRequest } from '@/presentation/protocols'
import {
  forbidden,
  ok,
  serverError
} from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import {
  mockAccountModel,
  mockLoadAccountByTokenUseCase
} from '@/tests/utils/index'

describe('Auth Middleware', () => {
  const fakeAccount = mockAccountModel()

  const role = 'any_role'
  const loadAccountByTokenStub = mockLoadAccountByTokenUseCase()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)

  const httpRequest: HttpRequest = {
    headers: {}
  }

  test('Should return 403 if there is no x-access-token in headers', async () => {
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 403 if there is no headers', async () => {
    const httpResponse = await sut.handle({ body: {} })

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const loadAccountSpy = jest.spyOn(loadAccountByTokenStub, 'load')

    httpRequest.headers = {
      'x-access-token': 'any_token'
    }

    await sut.handle(httpRequest)

    expect(loadAccountSpy).toHaveBeenCalledWith(
      httpRequest.headers['x-access-token'],
      role
    )
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValueOnce(null)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok({ accountId: fakeAccount.id }))
  })

  test('Should return 500 if LoadAccountByToken throw an Error', async () => {
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

import { InvalidParamError, ServerError } from '@/presentation/errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '@/presentation/helpers/http/http-helper'
import { LoginController } from '@/presentation/controllers/account/login/login-controller'
import {
  mockAuthentication,
  mockHttpRequest,
  mockValidation
} from '@/tests/utils'

describe('Login Controller', () => {
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new LoginController(authenticationStub, validationStub)

  const httpRequest = mockHttpRequest()

  test('Should call Authentication with correct values', async () => {
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(httpRequest)
    const { email, password } = httpRequest.body
    expect(authSpy).toHaveBeenCalledWith({ email, password })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(null)

    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws an Error', async () => {
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if controller is called with correct values', async () => {
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ accessToken: 'access_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('any_field'))

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      badRequest(new InvalidParamError('any_field'))
    )
  })
})

import {
  Authentication,
  HttpRequest,
  Validation
} from '@/presentation/controllers/login/login-protocols'
import {
  InvalidParamError,
  ServerError
} from '@/presentation/errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '@/presentation/helpers/http/http-helper'
import { LoginController } from '@/presentation/controllers/login/login'

describe('Login Controller', () => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return Promise.resolve('access_token')
    }
  }

  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  const validationStub = new ValidationStub()
  const authenticationStub = new AuthenticationStub()
  const sut = new LoginController(authenticationStub, validationStub)

  const makeHttpRequest = (property?: string): HttpRequest => {
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    if (property) httpRequest.body[property] = undefined

    return httpRequest
  }

  test('Should call Authentication with correct values', async () => {
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    const { email, password } = httpRequest.body
    expect(authSpy).toHaveBeenCalledWith(email, password)
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpRequest = makeHttpRequest()
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws an Error', async () => {
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if controller is called with correct values', async () => {
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ accessToken: 'access_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeHttpRequest()

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('any_field'))

    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('any_field')))
  })
})

import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok } from '@/presentation/helpers/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { LoginController } from '../../../../src/presentation/controllers/login/login'
import { EmailValidator } from '../signup/signup-protocols'

describe('Login Controller', () => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()
  const sut = new LoginController(emailValidatorStub)

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

  test('Should return 400 if no email is provided', async () => {
    const httpRequest = makeHttpRequest('email')
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const httpRequest = makeHttpRequest('password')
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toBeCalledWith('any_email@mail.com')
    expect(isValidSpy).toBeTruthy()
  })

  test('Should return 400 if an invalid email is provided', async () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = makeHttpRequest()
    httpRequest.body.email = 'invalid_email@mail.com'
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 200 if controller is called with correct values', async () => {
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok())
  })
})

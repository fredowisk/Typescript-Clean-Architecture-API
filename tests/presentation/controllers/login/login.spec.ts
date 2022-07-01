import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok } from '@/presentation/helpers/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { LoginController } from '../../../../src/presentation/controllers/login/login'

describe('Login Controller', () => {
  const sut = new LoginController()

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

  test('Should return 200 if controller is called with correct values', async () => {
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok())
  })
})

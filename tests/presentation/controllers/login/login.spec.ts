import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok } from '@/presentation/helpers/http-helper'
import { LoginController } from '../../../../src/presentation/controllers/login/login'

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        email: 'any_email'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 200 if controller is called with correct values', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok())
  })
})

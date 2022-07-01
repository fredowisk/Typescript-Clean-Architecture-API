import { LogErrorRepository } from '@/data/protocols/log-error-repository'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols/'
import { LogControllerDecorator } from '@/main/decorators/log'

class ControllerStub implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {}
    }
    return Promise.resolve(httpResponse)
  }
}
class LogErrorRepositoryStub implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    return Promise.resolve(null)
  }
}

const controllerStub = new ControllerStub()
const logErrorRepositoryStub = new LogErrorRepositoryStub()
const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

const httpRequest = {
  body: {
    email: 'any_email@mail.com',
    name: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
}

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok())
  })

  test('Should call LogErrorRepository if controller returns a server error', async () => {
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(serverError(fakeError)))

    await sut.handle(httpRequest)
    expect(logSpy).toBeCalledWith('any_stack')
  })
})

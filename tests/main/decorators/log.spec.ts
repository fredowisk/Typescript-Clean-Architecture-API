import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols/'
import { LogControllerDecorator } from '../../../src/main/decorators/log'

class ControllerStub implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {
        name: 'Fred'
      }
    }
    return Promise.resolve(httpResponse)
  };
}

const controllerStub = new ControllerStub()
const sut = new LogControllerDecorator(controllerStub)

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith({
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.name).toBe('Fred')
  })
})

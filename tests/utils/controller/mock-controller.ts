import {
  HttpRequest,
  HttpResponse,
  Controller
} from '@/presentation/protocols/'

const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 204,
        body: null
      }
      return Promise.resolve(httpResponse)
    }
  }

  return new ControllerStub()
}

export { mockController }

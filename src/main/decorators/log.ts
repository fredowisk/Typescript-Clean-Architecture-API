import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

class LogControllerDecorator implements Controller {
  constructor (readonly controller: Controller) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      console.log('erro')
    }
    return httpResponse
  }
}

export { LogControllerDecorator }

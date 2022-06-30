import { LogErrorRepository } from '@/data/protocols/log-error-repository'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

class LogControllerDecorator implements Controller {
  constructor (
    readonly controller: Controller,
    readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}

export { LogControllerDecorator }
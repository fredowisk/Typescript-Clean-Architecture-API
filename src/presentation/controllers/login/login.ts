import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols/'

class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) return Promise.resolve(badRequest(new MissingParamError('email')))
    if (!httpRequest.body.password) return Promise.resolve(badRequest(new MissingParamError('password')))
    return ok()
  }
}

export { LoginController }

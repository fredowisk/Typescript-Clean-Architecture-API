import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import {
  badRequest,
  ok,
  serverError
} from '@/presentation/helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols/'
import { EmailValidator } from '../signup/signup-protocols'

class LoginController implements Controller {
  constructor (readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.email) {
        return Promise.resolve(badRequest(new MissingParamError('email')))
      }
      if (!httpRequest.body.password) {
        return Promise.resolve(badRequest(new MissingParamError('password')))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) { return Promise.resolve(badRequest(new InvalidParamError('email'))) }

      return ok()
    } catch (error) {
      return serverError(error)
    }
  }
}

export { LoginController }

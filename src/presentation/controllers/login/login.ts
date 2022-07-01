import { Authentication } from '@/application/usecases/authentication/authentication'
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
  constructor (
    readonly emailValidator: EmailValidator,
    readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return Promise.resolve(badRequest(new MissingParamError('email')))
      }
      if (!password) {
        return Promise.resolve(badRequest(new MissingParamError('password')))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return Promise.resolve(badRequest(new InvalidParamError('email')))
      }

      await this.authentication.auth(email, password)

      return ok()
    } catch (error) {
      return serverError(error)
    }
  }
}

export { LoginController }

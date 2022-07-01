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
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(`${field}`))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.authentication.auth(email, password)

      return ok()
    } catch (error) {
      return serverError(error)
    }
  }
}

export { LoginController }

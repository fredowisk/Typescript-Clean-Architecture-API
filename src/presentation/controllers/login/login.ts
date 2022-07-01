import {
  Authentication,
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from './login-protocols'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '@/presentation/helpers/http-helper'

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

      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) return unauthorized()

      return ok()
    } catch (error) {
      return serverError(error)
    }
  }
}

export { LoginController }

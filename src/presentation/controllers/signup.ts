import InvalidParamError from '../errors/invalid-param-error'
import MissingParamError from '../errors/missing-param-error'
import ServerError from '../errors/server-error'
import BadRequest from '../helpers/http-helper'
import Controller from '../protocols/controller'
import EmailValidator from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/Http'

class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return new BadRequest(new MissingParamError(`${field}`))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) return new BadRequest(new InvalidParamError('email'))

      return {
        statusCode: 200,
        body: 'Success'
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}

export default SignUpController

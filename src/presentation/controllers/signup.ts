import MissingParamError from '../errors/missing-param-error'
import BadRequest from '../helpers/http-helper'
import Controller from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/Http'

class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return new BadRequest(new MissingParamError(`${field}`))
      }
    }

    return {
      statusCode: 200,
      body: 'Success'
    }
  }
}

export default SignUpController

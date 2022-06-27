import MissingParamError from '../error/missing-param-error'
import BadRequest from '../helper/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/Http'

class SignUpController {
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

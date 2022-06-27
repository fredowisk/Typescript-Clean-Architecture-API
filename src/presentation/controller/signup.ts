import MissingParamError from '../error/missing-param-error'
import BadRequest from '../helper/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/Http'

class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return new BadRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return new BadRequest(new MissingParamError('email'))
    }

    return {
      statusCode: 200,
      body: 'Success'
    }
  }
}

export default SignUpController

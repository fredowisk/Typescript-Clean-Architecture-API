import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
  Validation
} from './signup-protocols-controller'

class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body

      await this.addAccount.add({ name, email, password })

      return ok()
    } catch (error) {
      return serverError(error)
    }
  }
}

export default SignUpController
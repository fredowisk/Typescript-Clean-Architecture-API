import { LoadAccountByTokenRepository } from '@/data/protocols/db/account-repository/load-account-by-token-repository'
import { AccessDeniedError } from '../errors'
import { forbidden, ok } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers['x-access-token']

    if (!accessToken) {
      return forbidden(new AccessDeniedError())
    }

    const account = await this.loadAccountByTokenRepository.load(accessToken)

    return ok(account)
  }
}

export { AuthMiddleware }

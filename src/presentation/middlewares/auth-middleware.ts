import {
  LoadAccountByToken,
  AccessDeniedError,
  forbidden,
  serverError,
  HttpRequest,
  HttpResponse,
  Middleware,
  noContent
} from './auth-middleware-protocols'

class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']

      if (!accessToken) {
        return forbidden(new AccessDeniedError())
      }

      const account = await this.loadAccountByToken.load(
        accessToken,
        this.role
      )

      if (!account) return forbidden(new AccessDeniedError())

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export { AuthMiddleware }

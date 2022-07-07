import { HttpRequest } from '@/presentation/protocols'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

describe('Auth Middleware', () => {
  test('Should return 403 if there is no x-access-token in headers', async () => {
    const sut = new AuthMiddleware()

    const httpRequest: HttpRequest = {
      headers: {}
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})

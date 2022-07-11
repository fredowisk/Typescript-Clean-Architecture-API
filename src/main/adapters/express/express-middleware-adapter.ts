import {
  HttpRequest,
  HttpResponse,
  Middleware
} from '@/presentation/protocols'
import { Request, Response, NextFunction } from 'express'

const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }

    const { statusCode, body }: HttpResponse = await middleware.handle(
      httpRequest
    )

    if (statusCode === 200) {
      Object.assign(req, body)
      return next()
    }

    return res.status(statusCode).json(body)
  }
}

export { adaptMiddleware }

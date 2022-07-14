import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      accountId: req.accountId,
      params: req.params,
      body: req.body
    }
    const { statusCode, body }: HttpResponse = await controller.handle(
      httpRequest
    )

    return res.status(statusCode).json(body)
  }
}

import { ServerError, UnauthorizedError } from '../../errors'
import { HttpResponse } from '../../protocols/http'

const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

const forbidden = (error: Error): HttpResponse => {
  return {
    statusCode: 403,
    body: error
  }
}

const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}

const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

const noContent = (): HttpResponse => {
  return {
    statusCode: 204,
    body: null
  }
}

export { badRequest, forbidden, unauthorized, serverError, ok, noContent }

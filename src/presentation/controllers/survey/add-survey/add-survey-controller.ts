import {
  badRequest,
  ok,
  serverError
} from '@/presentation/helpers/http/http-helper'
import {
  AddSurvey,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './add-survey-controller-protocols'

class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { question, answers } = httpRequest.body

      await this.addSurvey.add({ question, answers })

      return Promise.resolve(ok())
    } catch (error) {
      return serverError(error)
    }
  }
}

export { AddSurveyController }

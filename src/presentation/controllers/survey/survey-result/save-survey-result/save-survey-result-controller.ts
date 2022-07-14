import {
  LoadSurveyById,
  forbidden,
  ok,
  HttpRequest,
  Controller,
  HttpResponse,
  InvalidParamError,
  serverError
} from './save-survey-result-protocols'

class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(
        httpRequest.params.surveyId
      )

      if (!survey) return forbidden(new InvalidParamError('surveyId'))

      return ok(survey)
    } catch (error) {
      return serverError(error)
    }
  }
}

export { SaveSurveyResultController }

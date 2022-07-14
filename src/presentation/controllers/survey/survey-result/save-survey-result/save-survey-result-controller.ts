import {
  LoadSurveyById,
  forbidden,
  ok,
  HttpRequest,
  Controller,
  HttpResponse,
  InvalidParamError
} from './save-survey-result-protocols'

class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(
      httpRequest.params.surveyId
    )

    if (!survey) return forbidden(new InvalidParamError('surveyId'))

    return ok(survey)
  }
}

export { SaveSurveyResultController }

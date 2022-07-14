import {
  LoadSurveyById,
  noContent,
  ok,
  HttpRequest,
  Controller,
  HttpResponse
} from './save-survey-result-protocols'

class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(
      httpRequest.params.surveyId
    )

    if (!survey) return noContent()

    return ok(survey)
  }
}

export { SaveSurveyResultController }

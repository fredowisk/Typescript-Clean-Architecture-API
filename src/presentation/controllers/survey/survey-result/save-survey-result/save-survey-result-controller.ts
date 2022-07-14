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
      const {
        params: { surveyId },
        body: { answer }
      } = httpRequest

      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) return forbidden(new InvalidParamError('surveyId'))

      const answers = survey.answers.map((item) => item.answer)

      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }

      return ok(survey)
    } catch (error) {
      return serverError(error)
    }
  }
}

export { SaveSurveyResultController }

import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveys,
  noContent,
  ok,
  serverError
} from './load-surveys-controller-protocols'

class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const httpResponse = await this.loadSurveys.load()

      if (!httpResponse) return noContent()

      return ok(httpResponse)
    } catch (error) {
      return serverError(error)
    }
  }
}

export { LoadSurveysController }

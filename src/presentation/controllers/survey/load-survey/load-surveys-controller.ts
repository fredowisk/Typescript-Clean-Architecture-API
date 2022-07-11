import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveys,
  ok
} from './load-surveys-controller-protocols'

class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.loadSurveys.load()
    return ok(httpResponse)
  }
}

export { LoadSurveysController }

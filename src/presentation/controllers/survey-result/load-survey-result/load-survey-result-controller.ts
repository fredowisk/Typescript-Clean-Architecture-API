import {
  Controller,
  forbidden,
  HttpRequest,
  HttpResponse,
  InvalidParamError,
  LoadSurveyById,
} from "../save-survey-result/save-survey-result-protocols";

class LoadSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(
      httpRequest.params.surveyId
    );

    if (!survey) return forbidden(new InvalidParamError('surveyId'));
    return Promise.resolve(null);
  }
}

export { LoadSurveyResultController };

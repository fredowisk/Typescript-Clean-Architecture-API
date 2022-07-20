import {
  Controller,
  forbidden,
  HttpRequest,
  HttpResponse,
  InvalidParamError,
  LoadSurveyById,
  serverError,
} from "../save-survey-result/save-survey-result-protocols";

class LoadSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(
        httpRequest.params.surveyId
      );

      if (!survey) return forbidden(new InvalidParamError("surveyId"));
      return Promise.resolve(null);
    } catch (error) {
      return serverError(error);
    }
  }
}

export { LoadSurveyResultController };

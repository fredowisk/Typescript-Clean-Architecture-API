import { LoadSurveyResult } from "@/application/usecases/survey-result/load-survey-result/load-survey-result";
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
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        params: { surveyId },
        accountId,
      } = httpRequest;
      const survey = await this.loadSurveyById.loadById(surveyId);

      if (!survey) return forbidden(new InvalidParamError("surveyId"));

      await this.loadSurveyResult.load(surveyId, accountId);

      return Promise.resolve(null);
    } catch (error) {
      return serverError(error);
    }
  }
}

export { LoadSurveyResultController };

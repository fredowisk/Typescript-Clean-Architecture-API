import { ObjectId } from "mongodb";
import {
  Controller,
  LoadSurveyById,
  LoadSurveyResult,
  HttpRequest,
  HttpResponse,
  forbidden,
  InvalidParamError,
  ok,
  serverError,
} from "./load-survey-result-protocols";

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

      const surveyResult = await this.loadSurveyResult.load(
        surveyId,
        accountId
      );

      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}

export { LoadSurveyResultController };

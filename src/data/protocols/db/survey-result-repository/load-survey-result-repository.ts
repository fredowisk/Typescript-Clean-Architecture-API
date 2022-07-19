import { SurveyResultModel } from "@/domain/models/survey/survey-result";

interface LoadSurveyResultRepository {
  loadBySurveyId: (
    surveyId: string,
    accountId: string
  ) => Promise<SurveyResultModel>;
}

export { LoadSurveyResultRepository };

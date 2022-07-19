import { SurveyResultModel } from "@/domain/models/survey/survey-result";

interface LoadSurveyResult {
  load(surveyId: string, accountId: string): Promise<SurveyResultModel>;
}

export { LoadSurveyResult };

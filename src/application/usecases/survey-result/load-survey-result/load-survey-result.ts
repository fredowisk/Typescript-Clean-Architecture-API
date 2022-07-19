import { SurveyResultModel } from "@/domain/models/survey/survey-result";

interface LoadSurveyResult {
  load(surveyId: string): Promise<SurveyResultModel>;
}

export { LoadSurveyResult };

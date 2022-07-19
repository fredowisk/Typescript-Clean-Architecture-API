import { LoadSurveyResult } from "@/application/usecases/survey-result/load-survey-result/load-survey-result";
import { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result-repository/load-survey-result-repository";
import { SurveyResultModel } from "@/domain/models/survey/survey-result";

class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    const survey = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
      accountId
    );
    return survey;
  }
}

export { DbLoadSurveyResult };

import { LoadSurveyResult } from "@/application/usecases/survey-result/load-survey-result/load-survey-result";
import { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result-repository/load-survey-result-repository";
import { SurveyResultModel } from "@/domain/models/survey/survey-result";
import { LoadSurveyByIdRepository } from "../load-survey-by-id/db-load-survey-by-id-protocols";

class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
      accountId
    );

    if(!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId);
    }
    
    return surveyResult;
  }
}

export { DbLoadSurveyResult };

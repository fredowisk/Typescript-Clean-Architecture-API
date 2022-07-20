import { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result-repository/load-survey-result-repository";
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
  SaveSurveyResultRepository,
  SurveyResultModel,
} from "./db-save-survey-result-protocols";

class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data);
    return this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
      data.accountId
    );
  }
}

export { DbSaveSurveyResult };

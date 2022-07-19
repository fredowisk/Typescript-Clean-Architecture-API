import { SaveSurveyResultParams } from "@/application/usecases/survey/save-survey-result/save-survey-result-model";
import { SaveSurveyResultRepository } from "@/data/protocols/db/survey-result-repository/save-survey-result-repository";
import { SurveyResultModel } from "@/domain/models/survey/survey-result";
import { LoadSurveyResultRepository } from "data/protocols/db/survey-result-repository/load-survey-result-repository";
import { mockSurveyResultModel } from "../../models/survey-result/mock-survey-result";

const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub
    implements SaveSurveyResultRepository, LoadSurveyResultRepository
  {
    save(data: SaveSurveyResultParams): Promise<void> {
      return;
    }

    loadBySurveyId(
      surveyId: string,
      accountId: string
    ): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  return new SaveSurveyResultRepositoryStub();
};

export { mockSaveSurveyResultRepository };

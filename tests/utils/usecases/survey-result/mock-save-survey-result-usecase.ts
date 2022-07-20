import { SaveSurveyResult } from "@/application/usecases/survey-result/save-survey-result/save-survey-result";
import { SaveSurveyResultParams } from "@/application/usecases/survey-result/save-survey-result/save-survey-result-model";
import { SurveyResultModel } from "domain/models/survey/survey-result";
import { mockSurveyResultModel } from "../../models/index";

const mockSaveSurveyResultUseCase = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  return new SaveSurveyResultStub();
};

export { mockSaveSurveyResultUseCase };

import { SaveSurveyResult } from "@/application/usecases/survey/save-survey-result/save-survey-result";
import { SaveSurveyResultParams } from "@/application/usecases/survey/save-survey-result/save-survey-result-model";

const mockSaveSurveyResultUseCase = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResultParams): Promise<void> {
      return;
    }
  }

  return new SaveSurveyResultStub();
};

export { mockSaveSurveyResultUseCase };

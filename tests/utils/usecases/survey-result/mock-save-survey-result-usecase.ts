import { SaveSurveyResult } from '@/application/usecases/survey/save-survey-result/save-survey-result'
import { SaveSurveyResultParams } from '@/application/usecases/survey/save-survey-result/save-survey-result-model'
import { SurveyResultModel } from '@/domain/models/survey/survey-result'
import { mockSurveyResultModel } from '../../models/survey-result/mock-survey-result'

const mockSaveSurveyResultUseCase = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new SaveSurveyResultStub()
}

export { mockSaveSurveyResultUseCase }

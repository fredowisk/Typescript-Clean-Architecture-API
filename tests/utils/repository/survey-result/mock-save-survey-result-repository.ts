import { SaveSurveyResultParams } from '@/application/usecases/survey/save-survey-result/save-survey-result-model'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-repository/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey/survey-result'
import { mockSurveyResultModel } from '../../models/survey-result/mock-survey-result'

const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

export { mockSaveSurveyResultRepository }

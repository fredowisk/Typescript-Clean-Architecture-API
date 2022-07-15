import { LoadSurveyById } from '@/application/usecases/survey/load-survey-by-id/load-survey-by-id'
import { SurveyModel } from '@/domain/models/survey/survey'
import { mockSurveyModel } from '../../models/survey/mock-survey'

const mockLoadSurveyByIdUseCase = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdStub()
}

export { mockLoadSurveyByIdUseCase }

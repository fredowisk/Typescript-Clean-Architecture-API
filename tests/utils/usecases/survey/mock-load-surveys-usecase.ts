import { LoadSurveys } from '@/application/usecases/survey/load-surveys/load-surveys'
import { SurveyModel } from '@/domain/models/survey/survey'
import { mockSurveyModel } from '../../models/survey/mock-survey'

const mockLoadSurveysUseCase = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return Promise.resolve([mockSurveyModel()])
    }
  }
  return new LoadSurveysStub()
}

export { mockLoadSurveysUseCase }

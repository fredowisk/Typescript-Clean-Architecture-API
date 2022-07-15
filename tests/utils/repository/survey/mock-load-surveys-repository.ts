import { LoadSurveysRepository } from '@/data/protocols/db/survey-repository/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey/survey'
import { mockSurveyModel } from '../../models/survey/mock-survey'

const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return Promise.resolve([mockSurveyModel()])
    }
  }

  return new LoadSurveysRepositoryStub()
}

export { mockLoadSurveysRepository }

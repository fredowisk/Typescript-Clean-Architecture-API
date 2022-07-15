import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey-repository/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey/survey'
import { mockSurveyModel } from '../../models/survey/mock-survey'

const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export { mockLoadSurveyByIdRepository }

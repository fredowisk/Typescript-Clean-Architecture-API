import { LoadSurveyById } from '@/application/usecases/load-survey-by-id/load-survey-by-id'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '../load-surveys/db-load-surveys-protocols'

class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)

    return survey
  }
}

export { DbLoadSurveyById }

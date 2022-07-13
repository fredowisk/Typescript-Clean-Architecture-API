import { LoadSurveyById, LoadSurveyByIdRepository, SurveyModel } from './db-load-survey-by-id-protocols'

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

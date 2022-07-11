import {
  LoadSurveys,
  SurveyModel,
  LoadSurveysRepository
} from './db-load-surveys-protocols'

class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()

    return surveys
  }
}

export { DbLoadSurveys }

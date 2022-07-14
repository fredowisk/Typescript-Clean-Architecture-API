import {
  AddSurvey,
  AddSurveyParams,
  AddSurveyRepository
} from './db-add-survey-protocols'

class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}

export { DbAddSurvey }

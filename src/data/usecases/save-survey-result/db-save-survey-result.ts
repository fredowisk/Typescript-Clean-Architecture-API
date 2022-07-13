import { SaveSurveyResult } from '@/application/usecases/save-survey-result/save-survey-result'
import { SaveSurveyResultModel } from '@/application/usecases/save-survey-result/save-survey-result-model'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'

class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)

    return Promise.resolve(null)
  }
}

export { DbSaveSurveyResult }

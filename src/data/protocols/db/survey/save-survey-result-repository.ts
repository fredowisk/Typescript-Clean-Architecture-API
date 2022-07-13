import { SaveSurveyResultModel } from '@/application/usecases/save-survey-result/save-survey-result-model'
import { SurveyResultModel } from '@/domain/models/survey-result'

interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}

export { SaveSurveyResultRepository }

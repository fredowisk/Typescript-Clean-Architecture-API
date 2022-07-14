import { SaveSurveyResultParams } from '@/application/usecases/survey/save-survey-result/save-survey-result-model'
import { SurveyResultModel } from '@/domain/models/survey/survey-result'

interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}

export { SaveSurveyResultRepository }

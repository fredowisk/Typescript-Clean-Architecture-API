import { SurveyResultModel } from '@/domain/models/survey/survey-result'
import { SaveSurveyResultParams } from './save-survey-result-model'

interface SaveSurveyResult {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}

export { SaveSurveyResult }

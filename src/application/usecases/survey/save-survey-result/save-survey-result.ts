import { SurveyResultModel } from '@/domain/models/survey/survey-result'
import { SaveSurveyResultModel } from './save-survey-result-model'

interface SaveSurveyResult {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}

export { SaveSurveyResult }

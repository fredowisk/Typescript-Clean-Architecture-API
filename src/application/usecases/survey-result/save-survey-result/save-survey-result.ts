import { SaveSurveyResultParams } from './save-survey-result-model'

interface SaveSurveyResult {
  save: (data: SaveSurveyResultParams) => Promise<void>
}

export { SaveSurveyResult }

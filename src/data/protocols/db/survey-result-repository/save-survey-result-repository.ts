import { SaveSurveyResultParams } from '@/application/usecases/survey-result/save-survey-result/save-survey-result-model'

interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<void>
}

export { SaveSurveyResultRepository }

import { SurveyResultModel } from '@/domain/models/survey/survey-result'

type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>

export { SaveSurveyResultParams }

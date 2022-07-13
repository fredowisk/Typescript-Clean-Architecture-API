import { SurveyResultModel } from '@/domain/models/survey-result'

type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export { SaveSurveyResultModel }

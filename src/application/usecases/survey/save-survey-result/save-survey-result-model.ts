import { SurveyResultModel } from '@/domain/models/survey/survey-result'

type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export { SaveSurveyResultModel }

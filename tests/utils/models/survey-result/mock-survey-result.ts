import { SurveyResultModel } from '@/domain/models/survey/survey-result'
import { SaveSurveyResultParams } from '@/application/usecases/survey/save-survey-result/save-survey-result-model'

const mockSurveyResultModel = (): SurveyResultModel => ({
  id: 'any_id',
  surveyId: 'survey_id',
  accountId: 'account_id',
  answer: 'any_answer',
  date: new Date()
})

const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'survey_id',
  accountId: 'account_id',
  answer: 'any_answer',
  date: new Date()
})

export { mockSurveyResultModel, mockSaveSurveyResultParams }

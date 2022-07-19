import { SurveyResultModel } from '@/domain/models/survey/survey-result'
import { SaveSurveyResultParams } from '@/application/usecases/survey-result/save-survey-result/save-survey-result-model'

const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'survey_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 1,
      percent: 50
    },
    {
      answer: 'other_answer',
      image: 'any_image',
      count: 10,
      percent: 80
    }
  ],
  date: new Date()
})

const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'survey_id',
  accountId: 'account_id',
  answer: 'any_answer',
  date: new Date()
})

export { mockSurveyResultModel, mockSaveSurveyResultParams }

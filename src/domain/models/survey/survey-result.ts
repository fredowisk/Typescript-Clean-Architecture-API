import { SurveyResultAnswerModel } from './survey-answer'

interface SurveyResultModel {
  surveyId: string
  question: string
  answers: SurveyResultAnswerModel[]
  date: Date
}

export { SurveyResultModel }

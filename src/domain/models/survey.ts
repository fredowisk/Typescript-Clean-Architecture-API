import { SurveyAnswerModel } from './survey-answer'

interface SurveyModel {
  id: string
  question: string
  answer: SurveyAnswerModel[]
  date: Date
}

export { SurveyModel }

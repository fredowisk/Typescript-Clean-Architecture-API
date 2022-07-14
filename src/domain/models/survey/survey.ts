import { SurveyAnswerModel } from './survey-answer'

interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export { SurveyModel }

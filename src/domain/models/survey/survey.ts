import { SurveyResultAnswerModel } from './survey-answer'

interface SurveyModel {
  id: string
  question: string
  answers: SurveyResultAnswerModel[]
  date: Date
}

export { SurveyModel }

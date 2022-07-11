import { SurveyAnswer } from './survey-answer'

interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export { AddSurveyModel }

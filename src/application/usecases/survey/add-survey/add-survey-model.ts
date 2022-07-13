import { SurveyAnswerModel } from '../../../../domain/models/survey/survey-answer'

interface AddSurveyModel {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export { AddSurveyModel }

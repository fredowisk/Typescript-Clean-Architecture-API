import { SurveyAnswerModel } from '../../../../domain/models/survey/survey-answer'

interface AddSurveyParams {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export { AddSurveyParams }

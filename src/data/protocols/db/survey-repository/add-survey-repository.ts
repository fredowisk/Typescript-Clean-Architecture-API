import { AddSurveyParams } from '@/application/usecases/survey/add-survey/add-survey-model'

interface AddSurveyRepository {
  add: (survey: AddSurveyParams) => Promise<void>
}

export { AddSurveyRepository }

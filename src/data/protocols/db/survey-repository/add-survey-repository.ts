import { AddSurveyModel } from '@/application/usecases/survey/add-survey/add-survey-model'

interface AddSurveyRepository {
  add: (survey: AddSurveyModel) => Promise<void>
}

export { AddSurveyRepository }

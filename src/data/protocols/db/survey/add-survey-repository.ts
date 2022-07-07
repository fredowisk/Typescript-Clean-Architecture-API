import { AddSurveyModel } from '@/application/usecases/add-survey/add-survey-model'

interface AddSurveyRepository {
  add: (survey: AddSurveyModel) => Promise<void>
}

export { AddSurveyRepository }

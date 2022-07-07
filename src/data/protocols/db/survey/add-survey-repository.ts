import { AddSurveyModel } from '@/application/usecases/add-survey/add-survey-model'

interface AddSurveyRepository {
  add: (Survey: AddSurveyModel) => Promise<void>
}

export { AddSurveyRepository }

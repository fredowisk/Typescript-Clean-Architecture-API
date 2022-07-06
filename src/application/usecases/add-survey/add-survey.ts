import { AddSurveyModel } from './add-survey-model'

interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}

export { AddSurvey }

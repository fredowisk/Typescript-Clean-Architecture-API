import { AddSurveyParams } from './add-survey-model'

interface AddSurvey {
  add: (data: AddSurveyParams) => Promise<void>
}

export { AddSurvey }

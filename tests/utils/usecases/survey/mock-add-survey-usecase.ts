import { AddSurvey } from '@/application/usecases/survey/add-survey/add-survey'
import { AddSurveyParams } from '@/application/usecases/survey/add-survey/add-survey-model'

const mockAddSurveyUseCase = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return Promise.resolve(null)
    }
  }

  return new AddSurveyStub()
}

export { mockAddSurveyUseCase }

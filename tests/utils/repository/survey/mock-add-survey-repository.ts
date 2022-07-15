import { AddSurvey } from '@/application/usecases/survey/add-survey/add-survey'
import { AddSurveyParams } from '@/application/usecases/survey/add-survey/add-survey-model'

const mockAddSurveyRepository = (): AddSurvey => {
  class AddSurveyRepositoryStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return Promise.resolve(null)
    }
  }

  return new AddSurveyRepositoryStub()
}

export { mockAddSurveyRepository }

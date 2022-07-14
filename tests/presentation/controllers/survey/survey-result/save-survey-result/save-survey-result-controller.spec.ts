import { SaveSurveyResultController } from '@/presentation/controllers/survey/survey-result/save-survey-result/save-survey-result-controller'
import { LoadSurveyById } from 'application/usecases/survey/load-survey-by-id/load-survey-by-id'
import { SurveyModel } from 'domain/models/survey/survey'
import { HttpRequest } from 'presentation/protocols/http'

describe('Save Survey Result Controller', () => {
  const fakeSurvey: SurveyModel = {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
  }

  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(fakeSurvey)
    }
  }

  const loadSurveyByIdStub = new LoadSurveyByIdStub()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)

  const fakeRequest: HttpRequest = {
    params: {
      surveyId: 'any_id'
    }
  }

  test('Should call LoadSurveyById with correct values', async () => {
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')

    await sut.handle(fakeRequest)

    expect(loadByIdSpy).toHaveBeenCalledWith(fakeRequest.params.surveyId)
  })

  test('Should return 204 if LoadSurveyById returns null', async () => {
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockResolvedValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse.statusCode).toBe(204)
  })
})

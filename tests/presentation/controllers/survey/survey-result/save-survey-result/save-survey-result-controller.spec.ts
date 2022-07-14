import { SaveSurveyResultController } from '@/presentation/controllers/survey/survey-result/save-survey-result/save-survey-result-controller'
import {
  LoadSurveyById,
  forbidden,
  InvalidParamError,
  HttpRequest,
  serverError,
  ok
} from '@/presentation/controllers/survey/survey-result/save-survey-result/save-survey-result-protocols'
import { SurveyModel } from '@/domain/models/survey/survey'
import { SaveSurveyResult } from 'application/usecases/survey/save-survey-result/save-survey-result'
import { SaveSurveyResultParams } from 'application/usecases/survey/save-survey-result/save-survey-result-model'
import { SurveyResultModel } from 'domain/models/survey/survey-result'

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

  const fakeSurveyResult: SurveyResultModel = {
    id: 'any_id',
    surveyId: 'survey_id',
    accountId: 'account_id',
    answer: 'any_answer',
    date: new Date()
  }

  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(fakeSurvey)
    }
  }

  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(fakeSurveyResult)
    }
  }

  const loadSurveyByIdStub = new LoadSurveyByIdStub()
  const saveSurveyResultStub = new SaveSurveyResultStub()
  const sut = new SaveSurveyResultController(
    loadSurveyByIdStub,
    saveSurveyResultStub
  )

  const fakeRequest: HttpRequest = {
    accountId: 'any_id',
    params: {
      surveyId: 'any_id'
    },
    body: {
      answer: 'any_answer'
    }
  }

  test('Should call LoadSurveyById with correct values', async () => {
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')

    await sut.handle(fakeRequest)

    expect(loadByIdSpy).toHaveBeenCalledWith(fakeRequest.params.surveyId)
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockResolvedValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid answer is provided', async () => {
    const { params } = fakeRequest
    const body = {
      answer: 'wrong_answer'
    }
    const httpResponse = await sut.handle({ params, body })

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')

    await sut.handle(fakeRequest)

    const {
      accountId,
      params: { surveyId },
      body: { answer }
    } = fakeRequest

    expect(saveSpy).toHaveBeenCalledWith({
      surveyId,
      accountId,
      answer,
      date: new Date()
    })
  })

  test('Should return 500 if SaveSurveyResult throw an Error', async () => {
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on succcess', async () => {
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(ok(fakeSurveyResult))
  })
})

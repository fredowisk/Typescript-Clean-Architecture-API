import { SaveSurveyResultController } from '@/presentation/controllers/survey/survey-result/save-survey-result/save-survey-result-controller'
import {
  forbidden,
  InvalidParamError,
  serverError,
  ok
} from '@/presentation/controllers/survey/survey-result/save-survey-result/save-survey-result-protocols'
import {
  mockLoadSurveyByIdUseCase,
  mockSaveSurveyResultHttpRequest,
  mockSaveSurveyResultUseCase,
  mockSurveyResultModel
} from '@/tests/utils'

describe('Save Survey Result Controller', () => {
  const fakeSurveyResult = mockSurveyResultModel()

  const loadSurveyByIdStub = mockLoadSurveyByIdUseCase()
  const saveSurveyResultStub = mockSaveSurveyResultUseCase()
  const sut = new SaveSurveyResultController(
    loadSurveyByIdStub,
    saveSurveyResultStub
  )

  const fakeRequest = mockSaveSurveyResultHttpRequest()

  test('Should call LoadSurveyById with correct values', async () => {
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')

    await sut.handle(fakeRequest)

    expect(loadByIdSpy).toHaveBeenCalledWith(fakeRequest.params.surveyId)
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)

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

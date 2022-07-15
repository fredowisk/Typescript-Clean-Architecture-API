import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-surveys-controller'
import {
  noContent,
  ok,
  serverError
} from '@/presentation/controllers/survey/load-survey/load-surveys-controller-protocols'
import { mockLoadSurveysUseCase, mockSurveyModel } from '@/tests/utils/index'

describe('Load Surveys Controller', () => {
  const fakeSurveysList = [mockSurveyModel()]

  const loadSurveysStub = mockLoadSurveysUseCase()
  const sut = new LoadSurveysController(loadSurveysStub)

  test('Should call LoadSurveys', async () => {
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})

    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 200 on success', async () => {
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ok(fakeSurveysList))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    jest.spyOn(loadSurveysStub, 'load').mockResolvedValueOnce(null)

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throw an Error', async () => {
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

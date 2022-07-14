import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-surveys-controller'
import {
  LoadSurveys,
  noContent,
  ok,
  serverError,
  SurveyModel
} from '@/presentation/controllers/survey/load-survey/load-surveys-controller-protocols'

describe('Load Surveys Controller', () => {
  const fakeSurveysList: SurveyModel[] = [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        }
      ],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer'
        }
      ],
      date: new Date()
    }
  ]

  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return Promise.resolve(fakeSurveysList)
    }
  }

  const loadSurveysStub = new LoadSurveysStub()
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

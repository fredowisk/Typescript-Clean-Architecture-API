import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-surveys-controller'
import {
  LoadSurveys,
  SurveyModel
} from '@/presentation/controllers/survey/load-survey/load-surveys-controller-protocols'

describe('Load Surveys Controller', () => {
  const fakeSurveysList: SurveyModel[] = [
    {
      id: 'any_id',
      question: 'any_question',
      answer: [
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
      answer: [
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
})

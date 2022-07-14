import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys'
import {
  LoadSurveysRepository,
  SurveyModel
} from '@/data/usecases/survey/load-surveys/db-load-surveys-protocols'

describe('Db Load Surveys', () => {
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

  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return Promise.resolve(fakeSurveysList)
    }
  }

  const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  test('Should call LoadSurveysRepository', async () => {
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')

    await sut.load()

    expect(loadAllSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return a list of Surveys on success', async () => {
    const surveys = await sut.load()

    expect(surveys).toEqual(fakeSurveysList)
  })

  test('Should throw an Error if LoadSurveysRepository throws an Error', async () => {
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockRejectedValueOnce(new Error())

    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })
})

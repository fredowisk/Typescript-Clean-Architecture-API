import { DbLoadSurveys } from '@/data/usecases/load-surveys/db-load-surveys'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from 'domain/models/survey'

describe('Db Load Surveys', () => {
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

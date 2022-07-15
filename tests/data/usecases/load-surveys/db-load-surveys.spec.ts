import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys'
import {
  mockSurveyModel,
  mockLoadSurveysRepository
} from '@/tests/utils/index'

describe('Db Load Surveys', () => {
  const fakeSurveysList = [mockSurveyModel()]

  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
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

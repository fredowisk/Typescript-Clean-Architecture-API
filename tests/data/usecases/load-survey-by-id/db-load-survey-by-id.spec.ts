import { DbLoadSurveyById } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id'
import {
  mockLoadSurveyByIdRepository,
  mockSurveyModel
} from '@/tests/utils/index'

describe('Db LoadSurvey By Id', () => {
  const fakeSurvey = mockSurveyModel()
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)

  test('Should call LoadSurveyByIdRepository with a correct id', async () => {
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')

    await sut.loadById(fakeSurvey.id)

    expect(loadByIdSpy).toHaveBeenCalledWith(fakeSurvey.id)
  })

  test('Should return a survey on success', async () => {
    const survey = await sut.loadById(fakeSurvey.id)

    expect(survey).toEqual(fakeSurvey)
  })

  test('Should throw an Error if LoadSurveyByIdRepository throws an Error', async () => {
    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockRejectedValueOnce(new Error())

    const promise = sut.loadById(fakeSurvey.id)

    await expect(promise).rejects.toThrow()
  })
})

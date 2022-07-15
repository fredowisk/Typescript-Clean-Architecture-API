import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey'
import { mockAddSurveyRepository, mockAddSurveyParams } from '@/tests/utils/index'

describe('DbAddSurvey Use case', () => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  const fakeSurvey = mockAddSurveyParams()

  test('Should call AddSurveyRepository with correct values', async () => {
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(fakeSurvey)

    expect(addSpy).toHaveBeenCalledWith(fakeSurvey)
  })

  test('Should throw an Error if AddSurveyRepository throws an Error', async () => {
    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error())
    const promise = sut.add(fakeSurvey)

    await expect(promise).rejects.toThrow()
  })
})

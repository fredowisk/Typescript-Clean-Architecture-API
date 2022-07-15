import { DbSaveSurveyResult } from '@/data/usecases/survey/save-survey-result/db-save-survey-result'
import {
  mockSurveyResultModel,
  mockSaveSurveyResultRepository,
  mockSaveSurveyResultParams
} from '@/tests/utils'

describe('Db Save Survey Result', () => {
  const fakeResult = mockSurveyResultModel()
  const fakeResultParams = mockSaveSurveyResultParams()

  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')

    await sut.save(fakeResultParams)

    expect(saveSpy).toHaveBeenCalledWith(fakeResultParams)
  })

  test('Should return survey result on success', async () => {
    const surveyResult = await sut.save(fakeResultParams)

    expect(surveyResult).toEqual(fakeResult)
  })
})

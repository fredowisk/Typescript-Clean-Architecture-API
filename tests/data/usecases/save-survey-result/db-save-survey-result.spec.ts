import {
  SaveSurveyResultRepository,
  SaveSurveyResultModel,
  SurveyResultModel
} from '@/data/usecases/save-survey-result/db-save-survey-result-protocols'
import { DbSaveSurveyResult } from '@/data/usecases/save-survey-result/db-save-survey-result'

describe('Db Save Survey Result', () => {
  const fakeResult = {
    id: 'any_id',
    surveyId: 'survey_id',
    accountId: 'account_id',
    answer: 'any_answer',
    date: new Date()
  }

  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return Promise.resolve(fakeResult)
    }
  }

  const saveSurveyResultRepositoryStub = new SaveSurveyResultRepositoryStub()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

  const { id, ...fakeDataResult } = fakeResult

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')

    await sut.save(fakeDataResult)

    expect(saveSpy).toHaveBeenCalledWith(fakeDataResult)
  })

  test('Should return survey result on success', async () => {
    const surveyResult = await sut.save(fakeDataResult)

    expect(surveyResult).toEqual(fakeResult)
  })
})

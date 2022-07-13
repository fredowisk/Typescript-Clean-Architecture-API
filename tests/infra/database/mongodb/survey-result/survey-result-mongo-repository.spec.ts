import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { SurveyResultMongoRepository } from '@/infra/database/mongodb/survey-result/survey-result-mongo-repository'

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    await MongoHelper.clear('surveyResults')
  })

  const fakeSurveyResult = {
    surveyId: 'survey_id',
    accountId: 'account_id',
    answer: 'any_answer',
    date: new Date()
  }

  const sut = new SurveyResultMongoRepository()

  test('Should add a survey result if its new', async () => {
    const surveyResult = await sut.save(fakeSurveyResult)

    expect(surveyResult.id).toBeTruthy()
  })
})

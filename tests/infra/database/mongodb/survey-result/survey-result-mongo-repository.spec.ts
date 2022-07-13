import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { SurveyResultMongoRepository } from '@/infra/database/mongodb/survey-result/survey-result-mongo-repository'
import { Collection } from 'mongodb'

describe('Survey Result Mongo Repository', () => {
  let surveyResultCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
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

  test('Should update survey result if its not new', async () => {
    const { insertedId } = await surveyResultCollection.insertOne(
      fakeSurveyResult
    )

    fakeSurveyResult.answer = 'other_answer'

    const surveyResult = await sut.save(fakeSurveyResult)

    expect(surveyResult.id).toEqual(insertedId)
    expect(surveyResult.answer).toBe(fakeSurveyResult.answer)
  })
})

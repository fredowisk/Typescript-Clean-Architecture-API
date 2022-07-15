import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { SurveyResultMongoRepository } from '@/infra/database/mongodb/survey-result/survey-result-mongo-repository'
import { mockSaveSurveyResultParams } from '@/tests/utils'
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

  const fakeSurveyResultParams = mockSaveSurveyResultParams()

  const sut = new SurveyResultMongoRepository()

  test('Should add a survey result if its new', async () => {
    const surveyResult = await sut.save(fakeSurveyResultParams)

    expect(surveyResult).toBeTruthy()
    expect(surveyResult.id).toBeTruthy()
  })

  test('Should update survey result if its not new', async () => {
    const { insertedId } = await surveyResultCollection.insertOne(
      fakeSurveyResultParams
    )

    fakeSurveyResultParams.answer = 'other_answer'

    const surveyResult = await sut.save(fakeSurveyResultParams)

    expect(surveyResult.id).toEqual(insertedId)
    expect(surveyResult.answer).toBe(fakeSurveyResultParams.answer)
  })
})

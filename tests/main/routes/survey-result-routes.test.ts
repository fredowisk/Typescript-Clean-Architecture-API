import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { mockAddSurveyParams, mockAccessToken } from '@/tests/utils'

describe('Survey Result Routes', () => {
  let accountCollection: Collection
  let surveyCollection: Collection
  let accessToken: string

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    await Promise.all([
      MongoHelper.clear('accounts'),
      MongoHelper.clear('surveys'),
      MongoHelper.clear('surveyResults'),
      (accountCollection = await MongoHelper.getCollection('accounts')),
      (surveyCollection = await MongoHelper.getCollection('surveys')),
      (accessToken = await mockAccessToken(accountCollection))
    ])
  })

  const fakeSurvey = mockAddSurveyParams()

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 when call SaveSurveyResult without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 204 on save survey result with accessToken', async () => {
      const { insertedId } = await surveyCollection.insertOne(fakeSurvey)

      await request(app)
        .put(`/api/surveys/${insertedId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(204)
    })
  })
})

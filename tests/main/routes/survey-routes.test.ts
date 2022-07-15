import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '@/main/config/app'
import { Collection } from 'mongodb'
import { mockAccessToken, mockSurveyModel } from '@/tests/utils/index'

describe('Survey Routes', () => {
  let accountCollection: Collection
  let accessToken: string
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    await Promise.all([
      MongoHelper.clear('surveys'),
      MongoHelper.clear('accounts'),
      (accountCollection = await MongoHelper.getCollection('accounts')),
      (accessToken = await mockAccessToken(accountCollection))
    ])
  })

  const fakeSurvey = mockSurveyModel()

  describe('POST /surveys', () => {
    test('Should return 403 when call AddSurvey without accessToken', async () => {
      await request(app).post('/api/surveys').send(fakeSurvey).expect(403)
    })

    test('Should return 204 when call AddSurvey with a valid accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(fakeSurvey)
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 when call LoadSurveys without accessToken', async () => {
      await request(app).get('/api/surveys').expect(403)
    })

    test('Should return 200 when call AddSurvey with a valid accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})

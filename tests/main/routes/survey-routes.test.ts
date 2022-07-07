import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '@/main/config/app'

describe('Account Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clear('accounts')
  })

  const fakeSurvey = {
    question: 'Question',
    answers: [
      {
        image: 'http://image-name.com',
        answer: 'Answer 1'
      },
      {
        answer: 'Answer 2'
      }
    ]
  }

  describe('POST /surveys', () => {
    test('Should return 204 if AddSurvey succeeds', async () => {
      await request(app).post('/api/surveys').send(fakeSurvey).expect(204)
    })
  })
})

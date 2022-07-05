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

  describe('POST /signup', () => {
    test('Should return 200 if signup succeeds', async () => {
      await request(app)
        .post('/api/signup')
        .send({ name: 'Fred', email: 'fred@gmail.com', password: '123', passwordConfirmation: '123' })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('should ', () => {

    })
  })
})

import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '@/main/config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clear('accounts')
  })

  test('Should return nothing on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({ name: 'Fred', email: 'fred@gmail.com', password: '123', passwordConfirmation: '123' })
      .expect(200)
  })
})

import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '@/main/config/app'
import { hash } from 'bcrypt'
import env from '../config/env'

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

  const fakeAccount = {
    name: 'Fred',
    email: 'fred@gmail.com',
    password: '123',
    passwordConfirmation: '123'
  }

  describe('POST /signup', () => {
    test('Should return 200 if signup succeeds', async () => {
      await request(app).post('/api/signup').send(fakeAccount).expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login ', async () => {
      const password = await hash('123', env.salt)
      const accountCollection = await MongoHelper.getCollection('accounts')
      const { name, email } = fakeAccount
      await accountCollection.insertOne({ name, email, password })
      await request(app)
        .post('/api/login')
        .send({ email, password })
        .expect(200)
    })

    test('Should return 401 login return bad request', async () => {
      const { email, password } = fakeAccount
      await request(app)
        .post('/api/login')
        .send({ email, password })
        .expect(401)
    })
  })
})

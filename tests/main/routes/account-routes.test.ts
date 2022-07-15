import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { hash } from 'bcrypt'
import { mockRealAccount } from '@/tests/utils/index'

describe('Account Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    await MongoHelper.clear('accounts')
  })

  const fakeAccount = mockRealAccount()

  describe('POST /signup', () => {
    test('Should return 200 if signup succeeds', async () => {
      await request(app).post('/api/signup').send(fakeAccount).expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login ', async () => {
      const { name, email, password: oldPassword } = fakeAccount
      const password = await hash(oldPassword, env.salt)
      const accountCollection = await MongoHelper.getCollection('accounts')
      await accountCollection.insertOne({
        name,
        email,
        password
      })

      await request(app)
        .post('/api/login')
        .send({ email, password: oldPassword })
        .expect(200)
    })

    test('Should return 401 if login return bad request', async () => {
      const { email, password } = fakeAccount
      await request(app)
        .post('/api/login')
        .send({ email, password })
        .expect(401)
    })
  })
})

import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '@/main/config/app'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'
import { Collection } from 'mongodb'

describe('Survey Routes', () => {
  let accountCollection: Collection
  let accessToken: string
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    accountCollection = await MongoHelper.getCollection('accounts')
    await MongoHelper.clear('surveys')
    await MongoHelper.clear('accounts')
    accessToken = await makeAccessToken()
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

  const makeAccessToken = async (): Promise<string> => {
    const newUser: any = {
      name: 'Fred',
      email: 'fred@mail.com',
      password: '123',
      role: 'admin'
    }

    await accountCollection.insertOne(newUser)

    const { _id: id } = newUser

    const token = sign({ id }, env.jwtSecret)

    await accountCollection.updateOne(
      {
        _id: id
      },
      {
        $set: {
          accessToken: token
        }
      }
    )

    return token
  }

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
    test('Should return 403 on load surveys without accessToken', async () => {
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

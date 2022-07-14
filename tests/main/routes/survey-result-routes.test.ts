import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

describe('Survey Result Routes', () => {
  let accountCollection: Collection
  let surveyCollection: Collection
  let accessToken: string

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    accountCollection = await MongoHelper.getCollection('accounts')
    surveyCollection = await MongoHelper.getCollection('surveys')
    await MongoHelper.clear('accounts')
    await MongoHelper.clear('surveys')
    await MongoHelper.clear('surveyResults')
    accessToken = await makeAccessToken()
  })

  const fakeSurvey: any = {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
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

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const { insertedId } = await surveyCollection.insertOne(fakeSurvey)

      await request(app)
        .put(`/api/surveys/${insertedId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
  })
})

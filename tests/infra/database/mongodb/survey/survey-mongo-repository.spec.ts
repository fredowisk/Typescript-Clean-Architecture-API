import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from '@/infra/database/mongodb/survey-repository/survey-mongo-repository'
import { Collection } from 'mongodb'

describe('Survey Mongo Repository', () => {
  let surveyCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    surveyCollection = await MongoHelper.getCollection('surveys')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clear('surveys')
  })

  const sut = new SurveyMongoRepository()

  const fakeSurvey = {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ]
  }

  test('Should add a survey on success', async () => {
    await sut.add(fakeSurvey)

    const survey = await surveyCollection.findOne({ question: fakeSurvey.question })
    expect(survey).toBeTruthy()
  })
})

import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from '@/infra/database/mongodb/survey-repository/survey-mongo-repository'
import { Collection } from 'mongodb'

describe('Survey Mongo Repository', () => {
  let surveyCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    surveyCollection = await MongoHelper.getCollection('surveys')
  })

  beforeEach(async () => {
    await MongoHelper.clear('surveys')
  })

  const fakeSurvey = {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
  }

  const sut = new SurveyMongoRepository()

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      await sut.add(fakeSurvey)

      const survey = await surveyCollection.findOne({
        question: fakeSurvey.question
      })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertOne(fakeSurvey)
      const surveys = await sut.loadAll()

      expect(surveys).toEqual([fakeSurvey])
    })

    test('Should load an empty surveys list', async () => {
      const surveys = await sut.loadAll()

      expect(surveys).toEqual([])
    })
  })
})

import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from '@/infra/database/mongodb/survey-repository/survey-mongo-repository'
import { mockAddSurveyParams } from '@/tests/utils/index'
import { Collection, ObjectId } from 'mongodb'

describe('Survey Mongo Repository', () => {
  let surveyCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    surveyCollection = await MongoHelper.getCollection('surveys')
  })

  beforeEach(async () => {
    await MongoHelper.clear('surveys')
  })

  const fakeSurvey = mockAddSurveyParams()

  const sut = new SurveyMongoRepository()

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      await sut.add(fakeSurvey)

      const survey = await surveyCollection.findOne({
        question: fakeSurvey.question
      })

      expect(survey).toBeTruthy()
      expect(survey._id).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertOne(fakeSurvey)
      const surveys = await sut.loadAll()

      expect(surveys).toBeTruthy()
      expect(surveys[0].id).toBeTruthy()
    })

    test('Should load an empty surveys list', async () => {
      const surveys = await sut.loadAll()

      expect(surveys).toEqual([])
    })
  })

  describe('loadById', () => {
    test('Should load survey by id on success', async () => {
      const { insertedId } = await surveyCollection.insertOne(fakeSurvey)

      const id = new ObjectId(insertedId) as unknown as string

      const survey = await sut.loadById(id)

      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
})

import {
  AddSurveyParams,
  AddSurveyRepository
} from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { LoadSurveysRepository } from '@/data/usecases/survey/load-surveys/db-load-surveys-protocols'
import { SurveyModel } from '@/domain/models/survey/survey'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

class SurveyMongoRepository
implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository {
  async add (survey: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(survey)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()

    return surveys.map((survey) => MongoHelper.map<SurveyModel>(survey))
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne<SurveyModel>({
      _id: new ObjectId(id)
    })

    return survey && MongoHelper.map<SurveyModel>(survey)
  }
}

export { SurveyMongoRepository }

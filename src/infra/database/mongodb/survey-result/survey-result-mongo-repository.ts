import {
  SaveSurveyResultParams,
  SaveSurveyResultRepository,
  SurveyResultModel
} from '@/data/usecases/survey/save-survey-result/db-save-survey-result-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection(
      'surveyResults'
    )

    const { surveyId, accountId, answer, date } = data

    const document = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId,
        accountId
      },
      {
        $set: {
          answer,
          date
        }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )

    return document.value && MongoHelper.map<SurveyResultModel>(document.value)
  }
}

export { SurveyResultMongoRepository }

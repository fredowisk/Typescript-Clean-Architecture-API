import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey'
import { ErrorMongoRepository } from '@/infra/database/mongodb/log-repository/log-mongo-repository'
import { SurveyMongoRepository } from '@/infra/database/mongodb/survey-repository/survey-mongo-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '@/presentation/protocols/controller'
import { addSurveyValidation } from './add-survey-validation-factory'

const makeAddSurveyController = (): Controller => {
  const addSurveyRepository = new SurveyMongoRepository()
  const addSurvey = new DbAddSurvey(addSurveyRepository)
  const addSurveyController = new AddSurveyController(
    addSurveyValidation(),
    addSurvey
  )

  return new LogControllerDecorator(
    addSurveyController,
    new ErrorMongoRepository()
  )
}

export { makeAddSurveyController }

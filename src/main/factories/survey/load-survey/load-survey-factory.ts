import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys'
import { ErrorMongoRepository } from '@/infra/database/mongodb/log-repository/log-mongo-repository'
import { SurveyMongoRepository } from '@/infra/database/mongodb/survey-repository/survey-mongo-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-surveys-controller'
import { Controller } from '@/presentation/protocols/controller'

const makeLoadSurveysController = (): Controller => {
  const loadSurveysRepository = new SurveyMongoRepository()
  const loadSurveys = new DbLoadSurveys(loadSurveysRepository)
  const loadSurveysController = new LoadSurveysController(loadSurveys)
  return new LogControllerDecorator(
    loadSurveysController,
    new ErrorMongoRepository()
  )
}

export { makeLoadSurveysController }

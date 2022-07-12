import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/survey/add-survey/add-survey-factory'
import { makeLoadSurveysController } from '../factories/survey/load-survey/load-survey-factory'
import { adminAuth, auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}

import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeLoadSurveyResultController } from "../factories/survey-result/load-survey-result/load-survey-result-factory";
import { makeSaveSurveyResultController } from "../factories/survey-result/save-survey-result/save-survey-result-factory";
import { auth } from "../middlewares/auth";

export default (router: Router): void => {
  router.put(
    "/surveys/:surveyId/results",
    auth,
    adaptRoute(makeSaveSurveyResultController())
  );
  router.get(
    "/surveys/:surveyId/results",
    auth,
    adaptRoute(makeLoadSurveyResultController())
  );
};

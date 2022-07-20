import { DbLoadSurveyById } from "@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id";
import { DbLoadSurveyResult } from "@/data/usecases/survey/load-survey-result/db-load-survey-result";
import { ErrorMongoRepository } from "@/infra/database/mongodb/log-repository/log-mongo-repository";
import { SurveyMongoRepository } from "@/infra/database/mongodb/survey-repository/survey-mongo-repository";
import { SurveyResultMongoRepository } from "@/infra/database/mongodb/survey-result/survey-result-mongo-repository";
import { LogControllerDecorator } from "@/main/decorators/log-controller-decorator";
import { LoadSurveyResultController } from "@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller";
import { Controller } from "@/presentation/protocols/controller";

const makeLoadSurveyResultController = (): Controller => {
  const surveyRepository = new SurveyMongoRepository();
  const loadSurveyById = new DbLoadSurveyById(surveyRepository);
  const surveyResultRepository = new SurveyResultMongoRepository();
  const loadSurveyResult = new DbLoadSurveyResult(
    surveyResultRepository,
    loadSurveyById
  );
  const loadSurveyResultController = new LoadSurveyResultController(
    loadSurveyById,
    loadSurveyResult
  );
  return new LogControllerDecorator(
    loadSurveyResultController,
    new ErrorMongoRepository()
  );
};

export { makeLoadSurveyResultController };

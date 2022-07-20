import { DbLoadSurveyById } from "@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id";
import { DbSaveSurveyResult } from "@/data/usecases/survey/save-survey-result/db-save-survey-result";
import { ErrorMongoRepository } from "@/infra/database/mongodb/log-repository/log-mongo-repository";
import { SurveyMongoRepository } from "@/infra/database/mongodb/survey-repository/survey-mongo-repository";
import { SurveyResultMongoRepository } from "@/infra/database/mongodb/survey-result/survey-result-mongo-repository";
import { LogControllerDecorator } from "@/main/decorators/log-controller-decorator";
import { SaveSurveyResultController } from "@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller";
import { Controller } from "@/presentation/protocols/";

const makeSaveSurveyResultController = (): Controller => {
  const surveyMongoRepository = new SurveyMongoRepository();
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  const loadSurveyById = new DbLoadSurveyById(surveyMongoRepository);
  const saveSurveyResult = new DbSaveSurveyResult(
    surveyResultMongoRepository,
    surveyResultMongoRepository
  );
  const saveSurveyResultController = new SaveSurveyResultController(
    loadSurveyById,
    saveSurveyResult
  );

  return new LogControllerDecorator(
    saveSurveyResultController,
    new ErrorMongoRepository()
  );
};

export { makeSaveSurveyResultController };

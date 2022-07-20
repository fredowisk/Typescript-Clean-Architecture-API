import { LoadSurveyResult } from "@/application/usecases/survey-result/load-survey-result/load-survey-result";
import { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result-repository/load-survey-result-repository";
import { SurveyResultModel } from "@/domain/models/survey/survey-result";
import { LoadSurveyByIdRepository } from "../load-survey-by-id/db-load-survey-by-id-protocols";

class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
      accountId
    );

    if (!surveyResult) {
      const { answers, id, ...rest } =
        await this.loadSurveyByIdRepository.loadById(surveyId);
      return {
        surveyId: id,
        answers: answers.map((answer) => {
          answer.count = 0;
          answer.percent = 0;
          return answer;
        }),
        ...rest,
      };
    }

    return surveyResult;
  }
}

export { DbLoadSurveyResult };

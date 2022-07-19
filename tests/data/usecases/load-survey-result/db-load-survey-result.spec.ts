import { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result-repository/load-survey-result-repository";
import { mockSurveyResultModel } from "@/tests/utils/index";
import { DbLoadSurveyResult } from "@/data/usecases/survey/load-survey-result/db-load-survey-result";
import { SurveyResultModel } from "@/domain/models/survey/survey-result";

describe("DbLoadSurveyResult Use Case", () => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    loadBySurveyId(
      surveyId: string,
      accountId: string
    ): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);

  test("Should call LoadSurveyResultRepository with correct values", async () => {
    const loadBySurveyId = jest.spyOn(
      loadSurveyResultRepositoryStub,
      "loadBySurveyId"
    );

    await sut.load("any_survey_id", "any_account_id");
    expect(loadBySurveyId).toHaveBeenCalledWith(
      "any_survey_id",
      "any_account_id"
    );
  });

  test("Should throw an Error if LoadSurveyResultRepository throws an Error", async () => {
    jest
      .spyOn(loadSurveyResultRepositoryStub, "loadBySurveyId")
      .mockRejectedValueOnce(new Error());

    const promise = sut.load("any_survey_id", "any_account_id");
    await expect(promise).rejects.toThrow();
  });
});

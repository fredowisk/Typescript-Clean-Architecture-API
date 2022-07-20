import { DbSaveSurveyResult } from "@/data/usecases/survey/save-survey-result/db-save-survey-result";
import {
  mockSurveyResultModel,
  mockSaveSurveyResultRepository,
  mockSaveSurveyResultParams,
} from "@/tests/utils";
import { LoadSurveyResultRepository } from "data/protocols/db/survey-result-repository/load-survey-result-repository";
import { SurveyResultModel } from "domain/models/survey/survey-result";

describe("Db Save Survey Result", () => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    loadBySurveyId(
      surveyId: string,
      accountId: string
    ): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  const fakeResult = mockSurveyResultModel();
  const fakeResultParams = mockSaveSurveyResultParams();

  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub();
  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub
  );

  test("Should call SaveSurveyResultRepository with correct values", async () => {
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, "save");

    await sut.save(fakeResultParams);

    expect(saveSpy).toHaveBeenCalledWith(fakeResultParams);
  });

  test("Should call LoadSurveyResultRepository with correct values", async () => {
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      "loadBySurveyId"
    );

    await sut.save(fakeResultParams);

    const { accountId, surveyId } = fakeResultParams;

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyId, accountId);
  });

  test('Should throw an Error if LoadSurveyResultRepository throws an Error', async () => {
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(new Error());

    const promise = sut.save(fakeResultParams);

    await expect(promise).rejects.toThrow();
  });

  test("Should return a survey result on success", async () => {
    const surveyResult = await sut.save(fakeResultParams);

    expect(surveyResult).toEqual(fakeResult);
  });
});

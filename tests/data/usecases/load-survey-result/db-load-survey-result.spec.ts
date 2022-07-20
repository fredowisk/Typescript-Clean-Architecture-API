import { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result-repository/load-survey-result-repository";
import {  mockSurveyResultModel } from "@/tests/utils/index";
import { DbLoadSurveyResult } from "@/data/usecases/survey/load-survey-result/db-load-survey-result";
import { SurveyResultModel } from "@/domain/models/survey/survey-result";
import { LoadSurveyByIdRepository } from "data/protocols/db/survey-repository/load-survey-by-id-repository";
import { SurveyModel } from "domain/models/survey/survey";

describe("DbLoadSurveyResult Use Case", () => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    loadBySurveyId(
      surveyId: string,
      accountId: string
    ): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve({
        id: "any_id",
        question: "any_question",
        answers: [
          {
            image: "any_image",
            answer: "any_answer",
          },
          {
            answer: "other_answer",
            image: "any_image",
          },
        ],
        date: new Date(),
      });
    }
  }

  const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub();
  const loadSurveyByIdRepositoryStub = new LoadSurveyByIdRepositoryStub();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  );

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

  test("Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null", async () => {
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, "loadById");
    jest
      .spyOn(loadSurveyResultRepositoryStub, "loadBySurveyId")
      .mockResolvedValueOnce(null);

    await sut.load("any_survey_id", "any_account_id");

    expect(loadByIdSpy).toHaveBeenCalledWith("any_survey_id");
  });

  test("Should return surveyResultModel with all answers with count and percent equal 0 if LoadSurveyResultRepository returns null", async () => {
    jest
      .spyOn(loadSurveyResultRepositoryStub, "loadBySurveyId")
      .mockResolvedValueOnce(null);

    const surveyResult = await sut.load("any_survey_id", "any_account_id");

    expect(surveyResult.answers).toHaveLength(2);
    expect(surveyResult.answers[0].count).toBe(0);
    expect(surveyResult.answers[0].percent).toBe(0);
    expect(surveyResult.answers[1].count).toBe(0);
    expect(surveyResult.answers[1].percent).toBe(0);
  });

  test("Should return a surveyResultModel on success", async () => {
    const survey = await sut.load("survey_id", "account_id");

    expect(survey).toEqual(mockSurveyResultModel());
  });
});

import {
  mockSaveSurveyResultHttpRequest,
  mockSurveyModel,
  mockSurveyResultModel,
} from "@/tests/utils/index";
import { LoadSurveyById } from "@/application/usecases/survey/load-survey-by-id/load-survey-by-id";
import { SurveyModel } from "@/domain/models/survey/survey";
import { LoadSurveyResultController } from "@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller";
import {
  forbidden,
  InvalidParamError,
  ok,
  serverError,
} from "@/presentation/middlewares/auth-middleware-protocols";
import { LoadSurveyResult } from "application/usecases/survey-result/load-survey-result/load-survey-result";
import { SurveyResultModel } from "domain/models/survey/survey-result";

describe("Load Survey Result Controller", () => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }

  class LoadSurveyResultStub implements LoadSurveyResult {
    load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  const loadSurveyByIdStub = new LoadSurveyByIdStub();
  const loadSurveyResultStub = new LoadSurveyResultStub();

  const sut = new LoadSurveyResultController(
    loadSurveyByIdStub,
    loadSurveyResultStub
  );

  const httpRequest = mockSaveSurveyResultHttpRequest();

  test("Should call LoadSurveyById with correct value ", async () => {
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, "loadById");
    await sut.handle(httpRequest);

    expect(loadByIdSpy).toHaveBeenCalledWith("any_id");
  });

  test("Should return 403 if LoadSurveyById returns null", async () => {
    jest.spyOn(loadSurveyByIdStub, "loadById").mockResolvedValueOnce(null);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(forbidden(new InvalidParamError("surveyId")));
  });

  test("Should return 500 if LoadSurveyById throw an Error", async () => {
    jest
      .spyOn(loadSurveyByIdStub, "loadById")
      .mockRejectedValueOnce(new Error());

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should call LoadSurveyResult with correct values", async () => {
    const loadSpy = jest.spyOn(loadSurveyResultStub, "load");

    const {
      params: { surveyId },
      accountId,
    } = httpRequest;

    await sut.handle(httpRequest);

    expect(loadSpy).toHaveBeenCalledWith(surveyId, accountId);
  });

  test("Should return 500 if LoadSurveyResult throw an Error", async () => {
    jest.spyOn(loadSurveyByIdStub, "loadById").mockRejectedValueOnce(new Error());

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 200 on success", async () => {
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(ok(mockSurveyResultModel()));
  });
});

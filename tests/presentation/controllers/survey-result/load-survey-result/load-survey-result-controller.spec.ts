import {
  mockSaveSurveyResultHttpRequest,
  mockSurveyModel,
} from "@/tests/utils/index";
import { LoadSurveyById } from "@/application/usecases/survey/load-survey-by-id/load-survey-by-id";
import { SurveyModel } from "@/domain/models/survey/survey";
import { LoadSurveyResultController } from "@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller";

describe("Load Survey Result Controller", () => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }

  const loadSurveyByIdStub = new LoadSurveyByIdStub();

  const sut = new LoadSurveyResultController(loadSurveyByIdStub);

  test("Should call LoadSurveyById with correct value ", async () => {
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, "loadById");
    await sut.handle(mockSaveSurveyResultHttpRequest());

    expect(loadByIdSpy).toHaveBeenCalledWith("any_id");
  });
});

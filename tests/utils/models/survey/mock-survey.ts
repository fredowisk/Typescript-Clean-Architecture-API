import { AddSurveyParams } from "@/application/usecases/survey/add-survey/add-survey-model";
import { SurveyModel } from "@/domain/models/survey/survey";

const mockSurveyModel = (): SurveyModel => ({
  id: "any_id",
  question: "any_question",
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
      count: 10,
      percent: 1,
    },
    {
      answer: "other_answer",
      image: "any_image",
      count: 10,
      percent: 80,
    },
  ],
  date: new Date(),
});

const mockAddSurveyParams = (): AddSurveyParams => ({
  question: "any_question",
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
    {
      answer: "other_answer",
      image: "any_image",
      count: 10,
      percent: 80,
    },
  ],
  date: new Date(),
});

export { mockSurveyModel, mockAddSurveyParams };

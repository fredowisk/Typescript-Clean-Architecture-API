import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey'
import { AddSurvey } from '@/application/usecases/survey/add-survey/add-survey'
import { AddSurveyParams } from '@/application/usecases/survey/add-survey/add-survey-model'

describe('DbAddSurvey Use case', () => {
  class AddSurveyRepositoryStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return Promise.resolve(null)
    }
  }

  const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  const fakeSurvey = {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
  }

  test('Should call AddSurveyRepository with correct values', async () => {
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(fakeSurvey)

    expect(addSpy).toHaveBeenCalledWith(fakeSurvey)
  })

  test('Should throw an Error if AddSurveyRepository throws an Error', async () => {
    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(fakeSurvey)

    await expect(promise).rejects.toThrow()
  })
})

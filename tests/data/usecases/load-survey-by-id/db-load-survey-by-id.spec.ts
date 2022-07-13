import {
  SurveyModel,
  LoadSurveyByIdRepository
} from '@/data/usecases/load-survey-by-id/db-load-survey-by-id-protocols'
import { DbLoadSurveyById } from '@/data/usecases/load-survey-by-id/db-load-survey-by-id'

describe('Db LoadSurvey By Id', () => {
  const fakeSurvey: SurveyModel = {
    id: 'any_id',
    question: 'any_question',
    answer: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
  }

  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(fakeSurvey)
    }
  }
  const loadSurveyByIdRepositoryStub = new LoadSurveyByIdRepositoryStub()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)

  test('Should call LoadSurveyByIdRepository with a correct id', async () => {
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')

    await sut.loadById(fakeSurvey.id)

    expect(loadByIdSpy).toHaveBeenCalledWith(fakeSurvey.id)
  })

  test('Should return a survey on success', async () => {
    const survey = await sut.loadById(fakeSurvey.id)

    expect(survey).toEqual(fakeSurvey)
  })

  test('Should throw an Error if LoadSurveyByIdRepository throws an Error', async () => {
    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockRejectedValueOnce(new Error())

    const promise = sut.loadById(fakeSurvey.id)

    await expect(promise).rejects.toThrow()
  })
})

import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'
import { AddSurvey } from '@/application/usecases/add-survey/add-survey'
import { AddSurveyModel } from '@/application/usecases/add-survey/add-survey-model'

describe('Add Survey Controller', () => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyModel): Promise<void> {

    }
  }

  const validationStub = new ValidationStub()
  const addSurveyStub = new AddSurveyStub()
  const sut = new AddSurveyController(validationStub, addSurveyStub)

  const httpRequest: HttpRequest = {
    body: {
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        }
      ]
    }
  }

  test('Should call Validation with correct values', async () => {
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct values', async () => {
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddSurvey throw an Error', async () => {
    jest.spyOn(addSurveyStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from 'presentation/protocols/validation'

describe('Add Survey Controller', () => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  const validationStub = new ValidationStub()
  const sut = new AddSurveyController(validationStub)

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
})

import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import {
  badRequest,
  noContent,
  serverError
} from '@/presentation/helpers/http/http-helper'
import {
  mockAddSurveyUseCase,
  mockSurveyHttpRequest,
  mockValidation
} from '@/tests/utils'

describe('Add Survey Controller', () => {
  const validationStub = mockValidation()
  const addSurveyStub = mockAddSurveyUseCase()
  const sut = new AddSurveyController(validationStub, addSurveyStub)

  const httpRequest = mockSurveyHttpRequest()

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
    jest.spyOn(addSurveyStub, 'add').mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(noContent())
  })
})

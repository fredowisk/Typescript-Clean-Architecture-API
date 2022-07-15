import {
  noContent,
  serverError
} from '@/presentation/helpers/http/http-helper'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import {
  mockController,
  mockHttpRequest,
  mockLogErrorRepository
} from '@/tests/utils'

const controllerStub = mockController()
const logErrorRepositoryStub = mockLogErrorRepository()
const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

const httpRequest = mockHttpRequest()

describe('Log Controller Decorator', () => {
  test('Should call controller handle method with correct value', async () => {
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 204 if controller succeeds', async () => {
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should call LogErrorRepository if controller returns a server error', async () => {
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')

    jest
      .spyOn(controllerStub, 'handle')
      .mockResolvedValueOnce(serverError(fakeError))

    await sut.handle(httpRequest)
    expect(logSpy).toBeCalledWith('any_stack')
  })
})

import SignUpController from '@/presentation/controllers/account/signup/signup-controller'
import { EmailInUseError, ServerError } from '@/presentation/errors'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '@/presentation/helpers/http/http-helper'
import {
  mockAddAccountUseCase,
  mockAuthentication,
  mockHttpRequest,
  mockValidation
} from '@/tests/utils/index'

const addAccountStub = mockAddAccountUseCase()
const validationStub = mockValidation()
const authenticationStub = mockAuthentication()
const httpRequest = mockHttpRequest()

const sut = new SignUpController(
  addAccountStub,
  validationStub,
  authenticationStub
)

describe('SignUp Controller', () => {
  test('Should return 500 if AddAccount throws an Error', async () => {
    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddAccount with correct values', async () => {
    const addAccountSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(httpRequest)
    const { passwordConfirmation, ...rest } = httpRequest.body
    expect(addAccountSpy).toHaveBeenCalledWith(rest)
  })

  test('Should return 403 if AddAccount returns null', async () => {
    jest.spyOn(addAccountStub, 'add').mockResolvedValueOnce(null)

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if account is created successfully', async () => {
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ accessToken: 'access_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an Error', async () => {
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call Authentication with correct values', async () => {
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(httpRequest)
    const { email, password } = httpRequest.body
    expect(authSpy).toHaveBeenCalledWith({ email, password })
  })

  test('Should return 500 if Authentication throws an Error', async () => {
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})

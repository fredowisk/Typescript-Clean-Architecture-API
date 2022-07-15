import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { mockEmailValidator } from '@/tests/utils/index'
import { EmailValidation } from '@/validation/validators/email-validation'

const emailValidatorStub = mockEmailValidator()

const sut = new EmailValidation('email', emailValidatorStub)

const email = 'any_email@mail.com'

describe('SignUp Controller', () => {
  test('Should return an Error if EmailValidator return false', () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email })
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })

  test('Should throw an Error if EmailValidator throws an Error', () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})

import { loginValidation } from '@/main/factories/account/login/login-validation-factory'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { EmailValidation } from '@/validation/validators/email-validation'
import { EmailValidator } from '@/validation/protocols/email-validator'

jest.mock('@/validation/validators/validation-composite')

describe('Login Validation Factory', () => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()

  test('Should call ValidationComposite with all Validations', () => {
    loginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(
      new EmailValidation('email', emailValidatorStub)
    )

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

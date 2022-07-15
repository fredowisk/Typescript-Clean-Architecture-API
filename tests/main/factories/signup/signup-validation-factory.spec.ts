import { signUpValidation } from '@/main/factories/account/signup/signup-validation-factory'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields-validation'
import { EmailValidation } from '@/validation/validators/email-validation'
import { mockEmailValidator } from '@/tests/utils'

jest.mock('@/validation/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  const emailValidatorStub = mockEmailValidator()

  test('Should call ValidationComposite with all Validations', () => {
    signUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
      new EmailValidation('email', emailValidatorStub)
    )

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

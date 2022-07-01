import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/helpers/validators/validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'

describe('Validation Composite', () => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return new InvalidParamError('field')
    }
  }

  const validationStub = new ValidationStub()
  test('Should return them same error if validation fails', () => {
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({
      field: 'any_value'
    })

    expect(error).toEqual(new InvalidParamError('field'))
  })
})

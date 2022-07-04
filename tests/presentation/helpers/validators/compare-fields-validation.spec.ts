import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '@/presentation/helpers/validators/compare-fields-validation'

describe('Compare Fields Validation', () => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')

  test('Should return InvalidParamError if validation fails', () => {
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'different_value'
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })

    expect(error).toBeFalsy()
  })
})

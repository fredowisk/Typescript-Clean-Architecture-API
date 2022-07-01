import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'

describe('Required Field Validation', () => {
  test('Should return MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field')

    const error = sut.validate({ name: 'any_name' })

    expect(error).toEqual(new MissingParamError('any_field'))
  })
})

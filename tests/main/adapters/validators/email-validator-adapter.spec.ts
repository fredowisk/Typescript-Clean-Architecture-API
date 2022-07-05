import { EmailValidatorAdapter } from '@/main/adapters/validators/email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const sut = new EmailValidatorAdapter()

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBeFalsy()
  })

  test('Should return true if validator returns true', () => {
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBeTruthy()
  })

  test('Should call validator with correct email', () => {
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})

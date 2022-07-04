import { InvalidParamError } from '@/presentation/errors/'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { Validation } from '../../protocols/validation'

class EmailValidation implements Validation {
  constructor (private readonly emailField: string, private readonly emailValidator: EmailValidator) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.emailField])
    if (!isValid) return new InvalidParamError(this.emailField)
  }
}

export { EmailValidation }

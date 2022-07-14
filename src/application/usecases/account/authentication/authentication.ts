import { AuthenticationParams } from './authentication-model'

interface Authentication {
  auth: (authentication: AuthenticationParams) => Promise<string>
}

export { Authentication }

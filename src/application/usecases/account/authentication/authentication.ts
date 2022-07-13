import { AuthenticationModel } from './authentication-model'

interface Authentication {
  auth: (authentication: AuthenticationModel) => Promise<string>
}

export { Authentication }

import { DbLoadAccountByToken } from '@/data/usecases/load-account/db-load-account-by-token'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account-mongo-repository'
import env from '@/main/config/env'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols/middleware'

const makeAuthMiddleware = (role?: string): Middleware => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const loadAccountByToken = new DbLoadAccountByToken(
    jwtAdapter,
    accountMongoRepository
  )

  return new AuthMiddleware(loadAccountByToken, role)
}

export { makeAuthMiddleware }

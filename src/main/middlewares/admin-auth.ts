import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))

export { adminAuth }

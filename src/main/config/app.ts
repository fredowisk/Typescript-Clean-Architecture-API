import express from 'express'
import setupSwagger from './swagger-config'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

export default app

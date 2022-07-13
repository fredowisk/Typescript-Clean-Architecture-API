import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  // fg.sync('**/dist/main/routes/**routes.js').map(async (file) =>
  // (await import(`../../../${file}`)).default(router)
  // )

  readdirSync(path.join(__dirname, '..', 'routes')).map(async (file) => {
    if (!file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}

import request from 'supertest'
import app from '../../../src/main/config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post(
      '/test_body_parser',
      (req: { body: any }, res: { send: (arg0: any) => void }) => {
        res.send(req.body)
      }
    )

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Fred' })
      .expect({ name: 'Fred' })
  })
})

import request from 'supertest'
import app from '../../../src/main/config/app'

describe('SignUp Routes', () => {
  test('Should return nothing on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({ name: 'Fred', email: 'fred@gmail.com', password: '123', passwordConfirmation: '123' })
      .expect(200)
  })
})

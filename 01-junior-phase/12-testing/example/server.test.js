const app = require('./server')
const supertest = require('supertest')
const agent = supertest(app)

describe('Routes', () => {

  describe('GET /', () => {

    it('sends a 200', (done) => {
      agent.get('/').expect(200, done)
    })
  })
})

const {expect} = require('chai')
const app = require('../app')
const supertest = require('supertest')
const agent = supertest(app)
const {Page} = require('../models')

describe('http requests', () => {

  describe('GET /wiki/', () => {
    it('responds with 200', () => {
      return agent.get('/wiki/').expect(200)
    });
  })

  describe('GET /wiki/add', () => {
    it('responds with 200', () => {
      return agent.get('/wiki/add').expect(200)
    });
  })

  describe('GET /wiki/:urlTitle', () => {

    let page

    beforeEach(() => {
      return Page.sync({force: true})
        .then(() => {
          return Page.create({
            title: 'Cody goes to the beach',
            content: 'I forget how to play'
          })
        })
        .then(newPage => {
          page = newPage
        })
    })
    it('responds with 404 on page that does not exist', () => {
      return agent.get(`/wiki/i_do_not_exist`).expect(404)
    });
    it('responds with 200 on page that does exist', () => {
      return agent.get(page.route).expect(200)
    });
  })

  describe('GET /wiki/search/:tag', () => {
    it('responds with 200');
  })

  describe('GET /wiki/:urlTitle/similar', () => {
    it('responds with 404 for page that does not exist');
    it('responds with 200 for similar page');
  })

  describe('POST /wiki', () => {
    it('responds with 302');
    it('creates a page in the database', () => {
      return agent.post('/wiki').send({
        title: 'Cody does american idol',
        content: 'He sings a Beyonce song',
        authorName: 'Cody',
        authorEmail: 'cody@email.com'
      })
        .then(() => {
          return Page.findOne({where: {title: 'Cody does american idol'}})
        })
        .then(foundPage => {
          expect(foundPage).to.exist
        })

    });
  })

})

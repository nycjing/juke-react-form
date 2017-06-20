const {expect} = require('chai')
const {User, Page} = require('../models')

describe('Page model', () => {

  describe('Virtuals', () => {
    describe('route', () => {
      it('returns the url_name prepended by "/wiki/"', () => {
        const page = Page.build({ urlTitle: 'Cody_meets_air_bud' })
        expect(page.route).to.be.equal(`/wiki/Cody_meets_air_bud`)
      })
    })
    describe('renderedContent', () => {
      it('converts the markdown-formatted content into HTML')
    })
  })

  describe('Class methods', () => {
    describe('findByTag', () => {

      beforeEach(() => {
        return Page.sync({force: true})
          .then(() => {
            return Promise.all([
              Page.create({
                title: 'Cody gets a star',
                content: 'Cody is famous',
                tags: ['puglife', 'cody', 'hollywood']
              }),
              Page.create({
                title: 'Cody visits a movie studio',
                content: 'It was fun',
                tags: ['puglife']
              }),
              Page.create({
                title: 'Cody goes to Pixar',
                content: 'I love that dog from Up',
                tags: ['disney', 'pixar', 'squirrel']
              })

            ])
          })
      })

      it('gets pages with the search tag', () => {
        return Page.findByTag('puglife')
          .then(pages => {
            expect(pages.length).to.be.equal(2)
            expect(pages.every(page => page.tags.includes('puglife')))
              .to.be.equal(true)
          })

      })
      it('does not get pages without the search tag')
    })
  })

  describe('Instance methods', () => {
    describe('findSimilar', () => {
      it('never gets itself')
      it('gets other pages with any common tags')
      it('does not get other pages without any common tags')
    })
  })

  describe('Validations', () => {
    it('errors without title')
    it('errors without content')
    it('errors given an invalid status')
  })

  describe('Hooks', () => {
    it('it sets urlTitle based on title before validating')
  })

})

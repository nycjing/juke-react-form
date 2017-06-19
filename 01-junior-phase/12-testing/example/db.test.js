const {db, Dog} = require('./db')
const {expect} = require('chai')

describe('Dog', () => {

  let codyVar

  beforeEach((done) => {

    Dog.sync({force: true})
      .then(() => {
        return Dog.create({name: 'Cody'})
      })
      .then(newDogInDb => {
        codyVar = newDogInDb
        done()
      })
      .catch(done)

  })

  describe('instance methods', () => {

    describe('bark', () => {

      it('returns arf', () => {
        expect(codyVar.bark()).to.be.equal('arf')
      })
    })

  })

})


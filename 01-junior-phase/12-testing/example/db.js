const Sequelize = require('sequelize')
const URL = 'postgres://localhost:5432/testing-test'
const db = new Sequelize(URL, {logging: false})

const Dog = db.define('dog', {
  name: Sequelize.STRING
}, {
  instanceMethods: {
    bark () {
      return 'arf'
    }
  }
})

module.exports = { db, Dog }

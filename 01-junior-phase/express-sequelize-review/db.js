const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/express-sequelize-review', {
  logging: false
})

const Dog = db.define('dog')

const Bone = db.define('bone')

const Owner = db.define('owner')

db.sync({force: true})
  .then(() => {
    // playground
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
  })

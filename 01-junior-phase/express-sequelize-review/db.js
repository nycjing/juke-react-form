const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/express-sequelize-review', {
  logging: false
})

const Dog = db.define('dog', {
  name: Sequelize.STRING
}, {
  hooks: {
    beforeValidate: function (dog, options) {
      console.log('beforeValidate')
    },
    beforeCreate: function (dog, options) {
      console.log('beforeCreate')
    }
  }
})

const Bone = db.define('bone')

const Owner = db.define('owner', {
  name: Sequelize.STRING
})

Dog.belongsTo(Owner) // Dog table will have an ownerId field
Owner.hasMany(Dog)

db.sync({force: true})
  .then(() => {
    return Dog.create({name: 'Cody'})
  })

// let owner
// let _cody
// db.sync({force: true})
//   .then(() => {
//     // playground
//     console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
//     return Owner.create({name: 'Tom'})
//   })
//   .then(tom => {
//     owner = tom
//     return Dog.create({name: 'Cody'})
//   })
//   .then(cody => {
//     cody.setOwner(owner)
//     return cody.save()
//   })
//   .then(cody => {
//     _cody = cody
//     return Dog.create({name: 'Murphy'})
//   })
//   .then(murphy => {
//     murphy.setOwner(owner)
//     return murphy.save()
//   })
//   .then(murphy => {
//     // console.log(murphy)
//     // console.log(_cody)
//     return owner.getDogs()
//   })
//   .then(dog => {
//     console.log(dog)
//   })

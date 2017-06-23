# QUESTIONS

* When you sync a db, can you sync tables individually, or separately? Can you do this in separate files?

  Yes! You can sync every table in the database like so: `db.sync()`, where `db` is your Sequelize instance.
  You can also sync individual tables like so: `TableA.sync()`. This can be done in any file you choose.
  Typically, the most common use case is to sync all tables when your server boots up, so most of the time
  we choose `db.sync`, but there may be circumstances where you only want to sync certain tables (eg. testing)

* What is the difference between `TableA.belongsTo(TableB)` and `TableB.hasMany(TableA)`

  Both will create a foreignKey column on `TableA` (i.e. `TableA` will have a `tableBId` column).
  The ONLY difference between the two is which model instances Sequelize will create
  its magical 'association methods' on (and you can have both!)

  For the case of `Dog.belongsTo(Owner)`, the following methods will exist:
      Sequelize does something like this: Dog.prototype['get' + relatedTableWithFirstCharacterUppercase]
    `dog.getOwner()` // name: 'Reggie', breed: 'terrier', ownerId: 1 (name: 'Shayne', id: 1)
    `dog.setOwner()`

  For the case of `Owner.hasMany(Dog)`, the following methods will exist:
    `owner.getDogs()`
    `owner.setDogs()`

  Likewise (for 1-1), for the case of `Owner.hasOne(Dog)`, the following methods will exist:
    `owner.getDog()`
    `owner.setDog()`

* Review of instanceMethods, classMethods, getterMethods and hooks

```javascript

  const Dog = db.define('dog', {
    name: Sequelize.STRING,
    breed: Sequelize.STRING,
    friendName: Sequelize.STRING
  }, {

    instanceMethods: {
      bark: function () { // do not make bark an arrow function
        console.log(this.name) // "Cody"
        // `this` refers to the instance (lowercase 'd' dog)

        // defines methods that individual dogs will use (ex. `dog.bark()`)

      },
      getFriends: function () { // do not make getFriends an arrow function

        return Dog.findAll({where: {friendName: this.name}}) // this.name === "Cody"

        .then((friends) => { // make the callback an arrow function!
          console.log(this.bark(friends))
        })

      }
    },

    classMethods: {
      findAllPugs: function () {
        // this === Dog
        return this.findAll({ where: { breed: 'pug' } })
        // or
        return Dog.findAll({where: {breed: 'pug'}})
        // `this` refers to the class (uppercase 'D' Dog)

        // defines methods that the Dog class will use (Dog.findAllPugs())
      }
    },

    getterMethods: {
      baz: function () {
        // `this` refers to the instance (lowercase 'd' dog)

        // defines 'virtual' columns that DO NOT exist in the database,
        // but can be calculated on the fly.

        // For example, say we want to access a dogs 'fullName', which is its name + its breed like so:
        // "Cody the Pug"
        // If we have a name field and a breed field, we can calculate this by concatenating name and breed.
        // So we write a getterMethod called 'fullName' that can `return this.name + ' the ' + this.breed`.
        // Now, on our dog instances, we can access a property called `dog.fullName`.
        // Note that we access this the way we access a PROPERTY - we do NOT invoke this.
        // DO NOT DO THIS: `dog.fullName()`, INSTEAD DO THIS: `dog.fullName`
      }
    },

    hooks: {
      beforeValidate: function (instance, options) {
        // `this` refers to the global context (or undefined in 'use strict')

        // the instance is available in the first argument

        // Hooks have specific names that must be used (beforeValidate, beforeSave, afterValidate, afterSave, etc)
        // These refer to specific moments in a model instances "lifecycle"

        // Hooks are useful for many use cases - a common one is changing other instances when one instance is updated
      }
    }
  })

```

* How to set columns with the Sequelize.DATE type
  * Use the Date constructor (i.e. `new Date()`)
  * `Sequelize.NOW` can be used in model defintion
    (ex. defining the defaultValue of a field with a type of Sequelize.DATE),
    but you can also use new Date() for that too, and there aren't any differences that I know of

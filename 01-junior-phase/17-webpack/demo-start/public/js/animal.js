const render = require('./render')

class Animal {

  constructor (name) {
    this.name = name
  }

  sayName () {
    render(`Hello, my name is ${this.name}`)
  }

}

module.exports = Animal

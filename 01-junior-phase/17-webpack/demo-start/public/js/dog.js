const Animal = require('./animal')
const render = require('./render')

const breeds = ['pug', 'goldendoodle', 'terrier']

// console.log(typeof Dog) // function

class Dog extends Animal {

  constructor (name, breed = 'pug') {
    super(name)
    this.breed = breed
  }

  // instance methods
  bark () {
    render('Arf! I am a dog named ' + this.name)
  }

  chew (toy) {
    render(this.name + ' chewed ' + toy)
  }

  // chewManyToys('a', 'v', 'c', 'd')
  //   a = 'a'
  //   b = 'v'
  //   toys = ['c', 'd']
  chewManyToys (...toys) {
    toys.forEach(toy => {
      this.chew(toy)
    })
  }

  static getBreeds () {
    return breeds
  }
}

module.exports = Dog

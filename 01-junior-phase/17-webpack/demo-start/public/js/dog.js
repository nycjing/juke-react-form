(function () {

  var breeds = ['pug', 'goldendoodle', 'terrier']

  function Dog (name, breed) {
    Animal.call(this, name)

    // default breed to be pug
    if (!breed) {
      breed = 'pug'
    }

    this.breed = breed
  }

  // inherit from Animal
  Dog.prototype = Object.create(Animal.prototype)
  Dog.prototype.constructor = Dog

  // class methods (or 'static' methods)
  Dog.getBreeds = function () {
    return breeds
  }

  // instance methods
  Dog.prototype.bark = function () {
    render('Arf! I am a dog named ' + this.name)
  }

  Dog.prototype.chew = function (toy) {
    render(this.name + ' chewed ' + toy)
  }

  Dog.prototype.chewManyToys = function () {
    var toys = [].slice.call(arguments)
    var self = this
    toys.forEach(function (toy) {
      self.chew(toy)
    })
  }

  window.Dog = Dog

})()

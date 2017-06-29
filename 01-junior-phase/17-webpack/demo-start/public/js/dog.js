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
    return 'Arf! I am a dog named ' + this.name
  }

  Dog.prototype.chew = function (toy) {
    return this.name + ' chewed ' + toy
  }

  Dog.prototype.chewToys = function (toys) {
    var self = this
    toys.forEach(function (toy) {
      self.chew(toy)
    })
  }

  window.Dog = Dog

})()

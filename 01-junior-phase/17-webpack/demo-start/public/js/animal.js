(function () {

  function Animal (name) {
    this.name = name
  }

  Animal.prototype.sayName = function () {
    render('Hello, my name is ' + this.name)
  }

  window.Animal = Animal

})()

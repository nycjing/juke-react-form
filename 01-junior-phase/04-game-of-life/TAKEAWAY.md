# TAKEAWAYS

* Conway's Game of Life is one example of a cellular automaton.
  It has a particular set of rules that govern the state of each cell in a grid,
  depending on the state of its neighbors.

* In order to to write logic to control this particular game play,
  you must first capture the game state of each cell, and then update them.

* Event listeners/click handlers help to create an interactive user interface,
  but pay close attention to the value of this when using them.

* Using object literal namespacing will help you maintain a pristine global scope,
  and result in more readable and extensible code.
  Again, though, pay close attention when using this.

* In general, you should aim for DRY and well-organized code.

# YOUR QUESTIONS

* GOL.forEachCell vs. this.forEachCell

* fn()              // global binding/global context
* obj.fn()          // implicit binding
* fn.call(obj, x, y), fn.apply(obj, [x, y]) // explicit binding
* fn.bind(obj)     // 'bind' binding, very explicit binding
* =>               // arrow binding



const boundFn = fn.bind(obj1) // winner!
boundFn.call(obj2)

  ```javascript
  obj4 = {
    someMethod: function (array) {
      console.log(this) // obj4 :)
      array.forEach(thing => {
        this.someThingElse(thing)
      })
    },
    someThingElse: function () { etc }
  }
  ```
const arrowFn = () => console.log(this) // winner!
arrowFn.bind(obj3)

element.addEventListener('click', () => {
  // watch out! oh noes!
})




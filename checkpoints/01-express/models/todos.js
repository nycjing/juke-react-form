'use strict';

var tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all keys (names) in our tasks object
    return Object.keys(tasks);
  },
  list: function (name) {
    // return the tasks associated with a specific key (name)  
    return tasks[name];
  },
  add: function (name, task) {
    // init complete status to false
    task.complete = false;
    // creates a new task list if one doesn't exist
    if (tasks[name] === undefined) {
      tasks[name] = [];
    }
    // add to the task list associated with the given name
    tasks[name].push(task);
  },
  complete: function (name, num) {
    // grabs the specific task from the task list associated
    // with the provided name and sets its complete value to true
    tasks[name][num].complete = true;
  },
  remove: function (name, num) {
    // **VERY USEFUL**
    // splice is an Array function with signature:
    //    array.splice(start, deleteCount)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    tasks[name].splice(num, 1);
  }
};

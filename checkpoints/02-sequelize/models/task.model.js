'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  due: Sequelize.DATE
}, {
  //---------VVVV---------  your code below  ---------VVV----------

  getterMethods: {
    timeRemaining: function () {
      return this.due ? this.due - Date.now() : Infinity;
    },
    overdue: function () {
      return !this.complete && this.timeRemaining < 0;
    }
  },

  classMethods: {
    clearCompleted: function () {
      return this.destroy({
        where: {complete: true}
      });
    },
    completeAll: function () {
      return this.update({
        complete: true
      }, {
        where: {complete: false},
        returning: true // not tested in the spec, but a very convenient Postgres feature
      });
    }
  },

  instanceMethods: {
    addChild: function (task) {
      task.parentId = this.id; // set me as the parent,
      return this.Model.create(task); // and make a new task.
    },
    getChildren: function () {
      return this.Model.findAll({
        where: {parentId: this.id} // get all tasks whose parent is me.
      });
    },
    getSiblings: function () {
      return this.Model.findAll({
        where: {
          parentId: this.parentId, // get all tasks with my parent...
          id: {$ne: this.id} // ...but don't include me.
        }
      });
    }
  },

  hooks: {
    beforeDestroy: function (task) {
      return this.destroy({
        where: {parentId: task.id},
        individualHooks: true // not tested in the spec, but a logical choice here
      });
    }
  }

  //---------^^^---------  your code above  ---------^^^----------
});

Task.belongsTo(Task, {as: 'parent'});

module.exports = Task;

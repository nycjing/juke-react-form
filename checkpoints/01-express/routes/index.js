'use strict';

var express = require('express');
var router = express.Router();
var todos = require('../models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.
router.get('/', function (req, res) {
  // res.json(val) is shorthand for res.send(JSON.stringify(val))
  res.json(todos.listPeople());
});

router.get('/:name', function (req, res, next) {
  var userTodos = todos.list(req.params.name);
  // name doesn't exist in todos
  if (userTodos === undefined) {
    return res.sendStatus(404);  // return to ensure the rest of the code is not run
  } 
  // if query is provided we filter
  if (req.query.status === 'complete') {
    userTodos = userTodos.filter((todo) => todo.complete);  // filter to only complete 
  } else if (req.query.status === 'active') {
    userTodos = userTodos.filter((todo) => !todo.complete); // filter to only incomplete
  }

  res.json(userTodos);
});

router.post('/:name', function (req, res) {
  // bad post if doesn't have a body, doesnt contain 'content' in the body or contains anything extra
  if (!req.body || !req.body.content || Object.keys(req.body).length !== 1) {
    return res.sendStatus(400);
  }
  todos.add(req.params.name, req.body);
  var userTodos = todos.list(req.params.name);
  var justAdded = userTodos[userTodos.length - 1]; // gets last todo (just added)
  res.status(201).send(justAdded);
});

router.put('/:name/:index', function (req, res) {
  todos.complete(req.params.name, req.params.index);
  res.sendStatus(200);
})

router.delete('/:name/:index', function (req, res) {
  todos.remove(req.params.name, req.params.index);
  res.sendStatus(204);
})
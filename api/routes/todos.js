const express = require('express');
const router = express.Router();
var moment = require('moment');
const Todo = require('../models/Todo');

/* GET /todos listing. */
router.post('/inbox', (req, res, next) => {
  console.log(req.body);
  Todo.find(req.body).sort({ updatedAt: -1 }).exec((err, todos) => {
    if (err) return next(err);
    res.json(todos);
  });
});

/* GET /todos/today listing. */
router.post('/today', (req, res, next) => {
  let start = moment().startOf('day').toDate(); 
  let end = moment().endOf('day').toDate();
  Todo.find({userId:req.body.userId,startDate:{$gte:start,$lte:end}}).sort({ updatedAt: -1 }).exec((err, todos) => {
    if (err) return next(err);
    res.json(todos);
  });
});

/* GET /todos/week listing. */
router.post('/week', (req, res, next) => {
  let start = moment().startOf('week').toDate(); 
  let end = moment().endOf('week').toDate();
  Todo.find({userId:req.body.userId,startDate:{$gte:start,$lte:end}}).sort({ updatedAt: -1 }).exec((err, todos) => {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /todos */
router.post('/', (req, res, next) => {
  Todo.create(req.body,  (err, todo) => {
    if (err) return next(err);
    console.log('New Todo created:');
    console.log(todo);
    res.json(todo);
  });
});

/* GET /todos/id */
router.get('/:id', (req, res, next) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return next(err);
    res.json(todo);
  });
});

/* PUT /todos/:id */
router.put('/:id', (req, res, next) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
    if (err) return next(err);
    res.json(todo);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id, req.body, (err, todo) => {
    if (err) return next(err);
    console.log('Todo deleted:');
    console.log(todo);
    res.json(todo);
  });
});

module.exports = router;
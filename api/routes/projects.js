const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

/* GET /projects listing. */
router.post('/all', (req, res, next) => {
  console.log(req.body);
  Project.find(req.body).sort({ updatedAt: -1 }).exec((err, projects) => {
    if (err) return next(err);
    res.json(projects);
  });
});

/* POST /projects */
router.post('/', (req, res, next) => {
  Project.create(req.body,  (err, projects) => {
    if (err) return next(err);
    console.log('New project created:');
    console.log(projects);
    res.json(projects);
  });
});

/* DELETE /projects/:id */
router.delete('/:id', (req, res, next) => {
  Project.findByIdAndRemove(req.params.id, req.body, (err, project) => {
    if (err) return next(err);
    console.log('Project deleted:');
    console.log(project);
    res.json(project);
  });
});

module.exports = router;
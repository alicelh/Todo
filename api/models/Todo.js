const mongoose = require('mongoose');

// Schema to enforce consistent structure.
const TodoSchema = new mongoose.Schema({
  name: String,
  completed: { type: Boolean, default: false },
  note: { type: String, default: '' },
  startDate: {type: Date, default: Date.now},
  project: {type: String, default: ''},
  priority: {type: String, default: '1'},
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', TodoSchema);

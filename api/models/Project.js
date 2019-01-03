const mongoose = require('mongoose');

// Schema to enforce consistent structure.
const ProjectSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Project', ProjectSchema);

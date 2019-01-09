const mongoose = require('mongoose');

// Schema to enforce consistent structure.
const ProjectSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String
});

module.exports = mongoose.model('Project', ProjectSchema);

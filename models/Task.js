const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: String,
  time: String,
  progress: Number,
  completed: Boolean,
});

module.exports = mongoose.model('Task', TaskSchema);

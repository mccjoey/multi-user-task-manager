const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  tasks: [
    {
      description: String,
      creationDate: Date,
      finishDate: Date,
      done: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Project", projectsSchema);

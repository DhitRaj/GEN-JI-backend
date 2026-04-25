const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    image: {
      type: String,
      default: null,
    },
    liveUrl: {
      type: String,
      default: null,
    },
    githubUrl: {
      type: String,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);

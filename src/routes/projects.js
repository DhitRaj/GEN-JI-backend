const express = require('express');
const {
  createProject,
  getAllProjects,
  getFeaturedProjects,
  getProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProject);

// Protected routes (Admin)
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;

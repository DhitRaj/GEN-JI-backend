const express = require('express');
const {
  submitForm,
  getAllClients,
  getClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public route
router.post('/submit', submitForm);

// Protected routes
router.get('/', protect, getAllClients);
router.get('/:id', protect, getClient);
router.put('/:id', protect, updateClient);
router.delete('/:id', protect, deleteClient);

module.exports = router;

const Service = require('../models/Service');
const { validateService } = require('../middleware/validation');

// Create Service
exports.createService = async (req, res) => {
  try {
    const { error, value } = validateService(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const service = await Service.create(value);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Service
exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Service
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      service,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Client = require('../models/Client');
const nodemailer = require('nodemailer');
const { validateClientForm } = require('../middleware/validation');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Submit Client Form
exports.submitForm = async (req, res) => {
  try {
    const { error, value } = validateClientForm(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create client record
    const client = await Client.create(value);

    // Send email to admin
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Client Submission: ${client.name}`,
        html: `
          <h2>New Client Request</h2>
          <p><strong>Name:</strong> ${client.name}</p>
          <p><strong>Email:</strong> ${client.email}</p>
          <p><strong>Phone:</strong> ${client.phone || 'Not provided'}</p>
          <p><strong>Requirement:</strong></p>
          <p>${client.requirement}</p>
          <p><strong>Submitted at:</strong> ${new Date(client.createdAt).toLocaleString()}</p>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      client,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Clients (Admin)
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: clients.length,
      clients,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Client
exports.getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.status(200).json({
      success: true,
      client,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Client Status
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      client,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

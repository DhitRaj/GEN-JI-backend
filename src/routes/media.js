const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const { protect } = require('../middleware/auth');

// Get all media
router.get('/', protect, async (req, res) => {
  try {
    const media = await Media.find()
      .populate('uploadedBy', 'email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, media });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single media
router.get('/:id', protect, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).populate('uploadedBy', 'email');
    
    if (!media) {
      return res.status(404).json({ success: false, error: 'Media not found' });
    }

    res.json({ success: true, media });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload media
router.post('/', protect, async (req, res) => {
  try {
    const { filename, originalName, mimeType, size, data, alt, caption } = req.body;

    if (!filename || !originalName || !mimeType || !size || !data) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const media = await Media.create({
      filename,
      originalName,
      mimeType,
      size,
      data,
      alt: alt || '',
      caption: caption || '',
      uploadedBy: req.admin._id,
    });

    res.status(201).json({ success: true, media });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update media
router.put('/:id', protect, async (req, res) => {
  try {
    const { alt, caption } = req.body;

    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({ success: false, error: 'Media not found' });
    }

    if (alt !== undefined) media.alt = alt;
    if (caption !== undefined) media.caption = caption;

    await media.save();

    res.json({ success: true, media });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete media
router.delete('/:id', protect, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({ success: false, error: 'Media not found' });
    }

    await media.deleteOne();

    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

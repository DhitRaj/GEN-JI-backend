const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: 'Gen-Ji Digital Studio',
    },
    siteTagline: {
      type: String,
      default: 'Next-Gen Digital Solutions',
    },
    siteDescription: {
      type: String,
      default: 'We build modern web applications, mobile apps, and digital solutions.',
    },
    logo: {
      type: String,
      default: '',
    },
    favicon: {
      type: String,
      default: '',
    },
    contactEmail: {
      type: String,
      default: 'admin@gen-ji.me',
    },
    contactPhone: {
      type: String,
      default: '+91 6307217752',
    },
    address: {
      type: String,
      default: '',
    },
    socialLinks: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
      github: { type: String, default: '' },
    },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      metaKeywords: { type: String, default: '' },
      ogImage: { type: String, default: '' },
    },
    analytics: {
      googleAnalyticsId: { type: String, default: '' },
      facebookPixelId: { type: String, default: '' },
    },
    maintenance: {
      enabled: { type: Boolean, default: false },
      message: { type: String, default: 'Site is under maintenance. We will be back soon!' },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Settings', settingsSchema);

// Seed initial data for development
const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./src/models/Admin');
const Service = require('./src/models/Service');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_LOCAL);
    console.log('Connected to MongoDB');

    // Create default admin
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'superadmin',
      });
      console.log('✅ Default admin created');
    }

    // Create default services
    const serviceCount = await Service.countDocuments();

    if (serviceCount === 0) {
      const services = [
        {
          title: 'Web Development',
          description: 'Custom web solutions built with modern technologies',
          icon: 'code',
          order: 1,
        },
        {
          title: 'Mobile Apps',
          description: 'Native and cross-platform mobile applications',
          icon: 'mobile',
          order: 2,
        },
        {
          title: 'Backend Systems',
          description: 'Scalable backend infrastructure and APIs',
          icon: 'database',
          order: 3,
        },
        {
          title: 'Security',
          description: 'Secure architecture with best practices',
          icon: 'shield',
          order: 4,
        },
      ];

      await Service.insertMany(services);
      console.log('✅ Default services created');
    }

    console.log('✅ Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedData();

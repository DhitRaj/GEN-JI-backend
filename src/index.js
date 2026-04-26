require('dotenv').config();
const dns = require('dns');

// Fix DNS resolution issues (use Cloudflare DNS)
dns.setServers(['1.1.1.1', '1.0.0.1']);

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

// Import routes
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');
const projectRoutes = require('./routes/projects');
const serviceRoutes = require('./routes/services');

const app = express();

// Middleware
app.use(helmet());
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:3001')
  .split(',').map(o => o.trim());

// Add localhost:3000 for development
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000');
  allowedOrigins.push('http://localhost:3001');
}

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Database Connection + Auto seed admin
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_LOCAL)
  .then(async () => {
    console.log('✅ MongoDB connected');
    // Auto-create admin if not exists
    try {
      const Admin = require('./models/Admin');
      const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
      if (!adminExists && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
        await Admin.create({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: 'superadmin',
        });
        console.log('✅ Default admin created:', process.env.ADMIN_EMAIL);
      } else {
        console.log('ℹ️ Admin already exists');
      }
    } catch (err) {
      console.error('❌ Admin seed error:', err.message);
    }
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

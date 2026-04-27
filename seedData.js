require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./src/models/Service');
const Project = require('./src/models/Project');

// Services Data
const servicesData = [
  {
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with latest technologies like Next.js, React, and Node.js.',
    icon: '🌐',
    features: [
      'Next.js & React',
      'Responsive Design',
      'SEO Optimized',
      'Fast Performance',
      'Progressive Web Apps',
      'API Integration'
    ],
    price: 'Starting from ₹50,000',
    order: 1
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experience.',
    icon: '📱',
    features: [
      'React Native',
      'Flutter',
      'Native Development',
      'App Store Ready',
      'Push Notifications',
      'Offline Support'
    ],
    price: 'Starting from ₹80,000',
    order: 2
  },
  {
    title: 'SaaS Platforms',
    description: 'Scalable SaaS solutions with authentication, subscriptions, dashboards, and complete user management.',
    icon: '⚙️',
    features: [
      'User Management',
      'Subscription System',
      'Analytics Dashboard',
      'API Integration',
      'Payment Gateway',
      'Multi-tenant Architecture'
    ],
    price: 'Starting from ₹1,50,000',
    order: 3
  },
  {
    title: 'E-Commerce',
    description: 'Complete e-commerce solutions with payment processing, inventory management, and admin dashboard.',
    icon: '🛒',
    features: [
      'Payment Gateway',
      'Inventory System',
      'Admin Dashboard',
      'Order Management',
      'Customer Portal',
      'Analytics & Reports'
    ],
    price: 'Starting from ₹1,00,000',
    order: 4
  },
  {
    title: 'AI Integration',
    description: 'AI-powered features including chatbots, automation, machine learning models, and intelligent systems.',
    icon: '🤖',
    features: [
      'AI Chatbots',
      'Process Automation',
      'ML Models',
      'Data Analysis',
      'Natural Language Processing',
      'Computer Vision'
    ],
    price: 'Starting from ₹1,20,000',
    order: 5
  },
  {
    title: 'Custom Software',
    description: 'Tailored software solutions designed specifically for your business needs with full-stack development.',
    icon: '🔧',
    features: [
      'Full Stack Development',
      'Microservices',
      'Cloud Native',
      'Enterprise Ready',
      'Scalable Architecture',
      'DevOps Integration'
    ],
    price: 'Custom Quote',
    order: 6
  }
];

// Projects Data
const projectsData = [
  {
    title: 'TaskFlow - SaaS Project Management',
    description: 'A comprehensive project management SaaS platform with team collaboration, task tracking, time management, and real-time updates. Features include Kanban boards, Gantt charts, team chat, file sharing, and advanced analytics.',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe', 'AWS S3'],
    liveUrl: 'https://taskflow-demo.com',
    featured: true
  },
  {
    title: 'ShopEase - E-Commerce Platform',
    description: 'Full-featured e-commerce platform with product catalog, shopping cart, payment integration, order management, inventory tracking, and customer reviews. Includes admin dashboard with sales analytics and reporting.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Razorpay', 'Redis', 'Cloudinary'],
    liveUrl: 'https://shopease-demo.com',
    featured: true
  },
  {
    title: 'AI ChatBot Assistant',
    description: 'Intelligent chatbot powered by OpenAI GPT-4 with natural language understanding, context awareness, multi-language support, and seamless integration with existing systems. Handles customer support, FAQs, and lead generation.',
    techStack: ['Python', 'FastAPI', 'OpenAI API', 'React', 'WebSocket', 'PostgreSQL'],
    liveUrl: 'https://aichat-demo.com',
    featured: true
  },
  {
    title: 'HealthTrack - Medical SaaS',
    description: 'Healthcare management system for clinics and hospitals with patient records, appointment scheduling, prescription management, billing, and telemedicine features. HIPAA compliant with secure data encryption.',
    techStack: ['Next.js', 'Express', 'MongoDB', 'WebRTC', 'Stripe', 'AWS'],
    liveUrl: 'https://healthtrack-demo.com',
    featured: false
  },
  {
    title: 'FoodHub - Restaurant Delivery App',
    description: 'Multi-restaurant food delivery platform with real-time order tracking, payment integration, restaurant management, delivery partner app, and customer loyalty programs. Available on iOS and Android.',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API', 'Razorpay', 'Firebase'],
    liveUrl: 'https://foodhub-demo.com',
    featured: false
  },
  {
    title: 'EduLearn - Online Learning Platform',
    description: 'E-learning platform with video courses, live classes, quizzes, assignments, progress tracking, certificates, and payment integration. Features include course marketplace and instructor dashboard.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS S3', 'Stripe', 'WebRTC'],
    liveUrl: 'https://edulearn-demo.com',
    featured: false
  },
  {
    title: 'FinanceFlow - Accounting SaaS',
    description: 'Cloud-based accounting software for small businesses with invoicing, expense tracking, financial reports, tax calculations, and bank reconciliation. Multi-currency support and automated workflows.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'Chart.js'],
    liveUrl: 'https://financeflow-demo.com',
    featured: false
  },
  {
    title: 'RealEstate Pro - Property Management',
    description: 'Property management system with listings, virtual tours, lead management, document management, tenant portal, and payment collection. Includes CRM and marketing automation.',
    techStack: ['Next.js', 'Express', 'MongoDB', 'Cloudinary', 'Razorpay', 'Google Maps'],
    liveUrl: 'https://realestatepro-demo.com',
    featured: false
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_LOCAL);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Service.deleteMany({});
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert services
    const services = await Service.insertMany(servicesData);
    console.log(`✅ Inserted ${services.length} services`);

    // Insert projects
    const projects = await Project.insertMany(projectsData);
    console.log(`✅ Inserted ${projects.length} projects`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

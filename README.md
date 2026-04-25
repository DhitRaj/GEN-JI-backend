# Gen-Ji Backend

Express.js backend API for Gen-Ji platform with MongoDB.

## Features

- ✅ JWT authentication
- ✅ MongoDB integration
- ✅ Admin panel with CRUD operations
- ✅ Email notifications
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling

## Installation

```bash
npm install
```

## Setup

1. Create `.env` file from `.env.example`
2. Configure MongoDB connection
3. Set up email credentials
4. Add JWT secret

## Development

```bash
npm run dev
```

Server runs on http://localhost:5000

## Folder Structure

```
src/
├── index.js             # Main server file
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── clients.js       # Client management routes
│   ├── projects.js      # Project routes
│   └── services.js      # Service routes
├── controllers/
│   ├── authController.js
│   ├── clientController.js
│   ├── projectController.js
│   └── serviceController.js
├── models/
│   ├── Admin.js         # Admin schema
│   ├── Client.js        # Client schema
│   ├── Project.js       # Project schema
│   └── Service.js       # Service schema
├── middleware/
│   ├── auth.js          # JWT authentication
│   └── validation.js    # Joi validation
└── config/
    └── database.js      # Database configuration
```

## Environment Variables

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@gen-ji.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-password
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## API Routes

### Auth
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login
- `GET /api/auth/logout` - Logout

### Clients
- `POST /api/clients/submit` - Submit form (public)
- `GET /api/clients` - Get all (protected)
- `GET /api/clients/:id` - Get single (protected)
- `PUT /api/clients/:id` - Update (protected)
- `DELETE /api/clients/:id` - Delete (protected)

### Projects
- `GET /api/projects` - Get all
- `GET /api/projects/:id` - Get single
- `POST /api/projects` - Create (protected)
- `PUT /api/projects/:id` - Update (protected)
- `DELETE /api/projects/:id` - Delete (protected)

### Services
- `GET /api/services` - Get all
- `GET /api/services/:id` - Get single
- `POST /api/services` - Create (protected)
- `PUT /api/services/:id` - Update (protected)
- `DELETE /api/services/:id` - Delete (protected)

## Database Schemas

### Admin
- email (string, unique)
- password (hashed)
- role (admin/superadmin)
- lastLogin (date)
- timestamps

### Client
- name, email, phone
- requirement
- status (new/contacted/in-progress/completed)
- timestamps

### Project
- title, description
- techStack (array)
- image, liveUrl, githubUrl
- featured (boolean)
- timestamps

### Service
- title, description
- icon, order
- timestamps

## Deployment

Build:
```bash
npm run build
```

Start:
```bash
npm start
```

Deploy to Render, Railway, or Heroku.

---

Built with Express.js + MongoDB + Node.js

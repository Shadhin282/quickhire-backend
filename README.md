# QuickHire Backend API

A robust, scalable Express.js backend API for a modern job board platform with role-based authentication, job management, and user administration capabilities.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

QuickHire Backend is a comprehensive API service designed to power a modern job board platform. It provides secure user authentication, role-based access control, complete job management CRUD operations, and integration with a PostgreSQL database via Prisma ORM. The API is production-ready and deployed on Vercel's serverless platform.

## ✨ Key Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based user authentication
- **Role-Based Access Control (RBAC)**: User and Admin roles with granular permissions
- **Password Security**: Bcrypt hashing for secure password storage
- **Token Management**: Automatic token generation and validation

### Job Management
- **Complete CRUD Operations**: Create, read, update, and delete job listings
- **Admin-Only Operations**: Restricted job creation and deletion to admin users
- **Job Filtering**: Search and filter jobs by category and other criteria
- **Job Details**: Comprehensive job information including title, description, company, location, salary, and requirements

### User Management
- **User Registration**: New user signup with email and password validation
- **User Login**: Secure authentication with JWT token generation
- **Admin Seeding**: Pre-configured admin user creation for platform initialization
- **user Profile**: User information management

### Data Management
- **Database Migrations**: Controlled schema evolution using Prisma Migrate
- **Data Seeding**: Automated database population with sample job data
- **Data Validation**: Request validation and error handling

### Deployment Features
- **Serverless Architecture**: Optimized for Vercel serverless deployment
- **Environment Configuration**: Flexible environment-based settings
- **Database Pooling**: Connection pooling support for PostgreSQL

## 🛠 Technology Stack

### Core Framework
- **Node.js** - JavaScript runtime environment
- **Express.js** - Minimal web application framework
- **TypeScript** - Type-safe JavaScript superset

### Database & ORM
- **PostgreSQL** - Relational database (via Neon)
- **Prisma ORM** - Modern database toolkit and ORM
- **Prisma Client** - Type-safe database client

### Authentication & Security
- **JWT (jsonwebtoken)** - JSON Web Token implementation
- **Bcrypt** - Password hashing library
- **CORS** - Cross-Origin Resource Sharing middleware

### Utilities
- **dotenv** - Environment variable management
- **ts-node** - TypeScript execution for Node.js
- **Prisma Migrate** - Database migration tool

### Development Tools
- **TypeScript Compiler** - Static type checking
- **NPM** - Package manager

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **git** (for version control)
- **PostgreSQL** database (or Neon account for cloud database)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Shadhin282/quickhire-backend.git
cd quickhire-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory using `.env.example` as a template:

```bash
cp .env.example .env
```

### 4. Configure Database

Update the `DATABASE_URL` in your `.env` file with your PostgreSQL connection string:

```env
DATABASE_URL='postgresql://user:password@host:port/dbname?sslmode=require'
```

### 5. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This command will:
- Create the database schema
- Generate Prisma Client
- Apply all migrations

### 6. Seed Database (Optional)

Populate your database with sample data:

```bash
# Seed admin user
npx ts-node src/scripts/seedAdmin.ts

# Seed sample jobs
npx ts-node src/scripts/seedJobs.ts
```

### 7. Start Development Server

```bash
npm run dev
```

The server will run on `http://localhost:5000`

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require&channel_binding=require

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Generate a secure random string)
JWT_SECRET=your_jwt_secret_key_here
```

### Important Notes:
- Never commit `.env` file to version control
- Keep `JWT_SECRET` secure and unique
- Use environment variables for all sensitive data
- All variables in `.env.example` are required for production

## 🗄 Database Setup

### Database Schema

The application uses the following main models:

#### User Model
- `id`: Unique identifier
- `name`: User full name
- `email`: User email (unique)
- `password`: Bcrypt-hashed password
- `role`: User role (USER or ADMIN)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

#### Job Model
- `id`: Unique identifier
- `title`: Job title
- `description`: Detailed job description
- `company`: Company name
- `location`: Job location
- `salary`: Salary range
- `category`: Job category
- `requirements`: Job requirements
- `createdBy`: Admin user ID who created the job
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Migrations

Running migrations:

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# View migration history
npx prisma migrate status

# Reset database (development only)
npx prisma migrate reset --force
```

## 🔌 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "token": "jwt_token"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "token": "jwt_token"
}
```

### Job Routes

#### Get All Jobs
```http
GET /api/jobs

Response: 200 OK
[
  {
    "id": "job_id",
    "title": "Senior Developer",
    "company": "Tech Company",
    "location": "New York",
    "salary": "$100,000 - $150,000",
    "category": "Technology",
    "description": "..."
  }
]
```

#### Get Single Job
```http
GET /api/jobs/:id

Response: 200 OK
{
  "id": "job_id",
  "title": "Senior Developer",
  "company": "Tech Company",
  ...
}
```

#### Create Job (Admin Only)
```http
POST /api/jobs
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "title": "Senior Developer",
  "description": "Job description",
  "company": "Tech Company",
  "location": "New York",
  "salary": "$100,000 - $150,000",
  "category": "Technology",
  "requirements": "5+ years experience"
}

Response: 201 Created
```

#### Update Job (Admin Only)
```http
PUT /api/jobs/:id
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "title": "Updated Job Title",
  ...
}

Response: 200 OK
```

#### Delete Job (Admin Only)
```http
DELETE /api/jobs/:id
Authorization: Bearer jwt_token

Response: 204 No Content
```

## 🔐 Authentication

### JWT Token Flow

1. **User Registration/Login**: Credentials validated, JWT token generated
2. **Token Storage**: Client stores token (localStorage/sessionStorage)
3. **Authenticated Requests**: Token sent in `Authorization: Bearer <token>` header
4. **Token Validation**: Server verifies token signature and expiration
5. **Protected Routes**: Access granted only with valid token

### Middleware

- **Auth Middleware**: Validates JWT tokens and attaches user to request
- **Admin Middleware**: Restricts access to admin-only routes

### Example Protected Request

```bash
curl -X GET http://localhost:5000/api/jobs \
  -H "Authorization: Bearer your_jwt_token"
```

## 🚀 Deployment

### Deploy to Vercel

The application is configured for seamless Vercel deployment with serverless functions.

#### Prerequisites
- Vercel account
- PostgreSQL database (e.g., Neon)
- GitHub repository

#### Deployment Steps

1. **Connect Repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select `quickhire-backend` repository

2. **Configure Environment Variables**
   - In Vercel Settings → Environment Variables
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Add `JWT_SECRET` with a secure random string
   - Add `NODE_ENV=production`

3. **Deploy**
   - Vercel automatically deploys on git push
   - Prisma Client is generated during build
   - Database migrations run on deployment

4. **Verify Deployment**
   - Visit your Vercel deployment URL
   - Test API endpoints with your frontend

#### Production Considerations

- Ensure `binaryTargets` include `debian-openssl-1.1.x` in `prisma/schema.prisma`
- Use `postinstall` script for Prisma Client generation
- Environment variables are securely stored in Vercel dashboard
- Database connection pooling recommended for serverless

## 📂 Project Structure

```
backend/
├── src/
│   ├── index.ts                 # Main server entry point
│   ├── prisma.ts               # Prisma client instance
│   ├── seed.ts                 # Database seeding logic
│   ├── controllers/
│   │   ├── auth.controller.ts  # Authentication logic
│   │   └── jobs.controller.ts  # Job management logic
│   ├── middlewares/
│   │   └── auth.middleware.ts  # JWT validation & authorization
│   ├── routes/
│   │   ├── auth.routes.ts      # Auth endpoints
│   │   └── jobs.routes.ts      # Job endpoints
│   └── scripts/
│       ├── seedAdmin.ts        # Admin user seeding
│       └── seedJobs.ts         # Sample jobs seeding
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vercel.json                 # Vercel configuration
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload

# Build
npm run build            # Compile TypeScript to JavaScript

# Database
npx prisma migrate dev  # Create and apply database migrations
npx prisma studio      # Open Prisma Studio for database visualization

# Seeding
npx ts-node src/scripts/seedAdmin.ts   # Seed admin user
npx ts-node src/scripts/seedJobs.ts    # Seed sample jobs
```

## 🧪 Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get Jobs
curl -X GET http://localhost:5000/api/jobs
```

### Using Postman

1. Import API endpoints into Postman
2. Set `Authorization` header with Bearer token
3. Test all endpoints with sample data

## 📝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow the existing code structure
- Add comments for complex logic
- Test changes before submitting PR

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For issues and questions:
- Open an issue on [GitHub Issues](https://github.com/Shadhin282/quickhire-backend/issues)
- Review [API Documentation](#-api-endpoints)
- Check existing issues for solutions

## 🎯 Future Enhancements

- [ ] Email notifications for new applications
- [ ] Advanced job search with filters
- [ ] User profile customization
- [ ] Application tracking system
- [ ] Job recommendation engine
- [ ] Analytics dashboard

---

**Last Updated**: March 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅

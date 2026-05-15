# Task Manager REST API

A backend REST API for a task management application built with Node.js, Express, and MongoDB. Supports role-based access control where users manage their own tasks and admins have full access to the system.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** Bcrypt
- **Validation:** Express Validator
- **Email:** SendGrid
- **Environment Variables:** Dotenv

---

## Project Structure

```
task-manager-api/
├── controllers/
│   ├── authController.js        # Signup, Login, Forgot/Reset Password
│   ├── taskController.js        # Task CRUD for users
│   └── adminController.js       # Admin operations
├── middleware/
│   ├── authorizeRequest.js        # JWT verification
│   ├── Isadmin.js                  # Admin role check for speicfic routes
│   └──error hadling middleware.js  # global middleware
    |___  validator/
                 |___loginvaidation.js    # validating input vlaues 
                 |___signuValidation       # validating input vlaues 

├── models/
│   ├── userModel.js             # User schema
│   └── taskModel.js             # Task schema
├── routes/
│   ├── authRoutes.js            # Auth routes
│   ├── taskRoutes.js            # Task routes
│   └── adminRoutes.js           # Admin routes
├── util/
│   └── sendEmail.js             # Email helper
    |__geerate_jwt.js              # token geenration on login 
    |__passwordresetToken.js        # token for sening with emial on forget password req

├── .gitignore
├── app.js                       # Entry point
├── seedAdmin.js                 # Create default admin
└── package.json
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Soban-Abbas/Task-Manager-REST-API.git
cd Task-Manager-REST-API
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables



### 4. Create Admin User

```bash
node seedAdmin.js
```

This creates a default admin account. Run only once.

### 5. Start the Server

```bash

npm start
```

Server runs at: `http://localhost:8080`

---

## API Endpoints

### Auth Routes — 

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user (sends welcome email) | No |
| POST | `/login` | Login — returns JWT token | No |
| POST | `/forgot-password` | Send password reset email | No |
| POST | `/reset-password` | Reset password using token | No |

---

### Task Routes —  (User)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/tasks` | Create new task | Yes |
| GET | `/tasks` | Get all your tasks (with pagination) | Yes |
| GET | `/tasks/:taskId` | Get one task by ID | Yes |
| PATCH | `/updateTask/:taskId` | Update task (title, status, etc) | Yes |
| DELETE | `/task/:taskId` | Delete your task | Yes |

---

### Admin Routes — (Admin Only)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/users` | Get all users (with pagination) | Admin |
| GET | `/admin/usertask/:userId` | Get one user with their tasks | Admin |
| GET | `/admin/userstasks` | Get all users with their tasks | Admin |
| DELETE | `/admin/user/:userId` | Delete user and all their tasks | Admin |

---

## Role Based Access

| Feature | User | Admin |
|---------|------|-------|
| Manage own tasks | ✅ | ✅ |
| See other users tasks | ❌ | ✅ |
| Delete other users | ❌ | ✅ |
| Access admin routes | ❌ | ✅ |

---

## Task Status Flow

```
pending  →  in-progress  →  completed
```

Send status in PATCH request body:
```json
{ "status": "in-progress" }
```

---

## Testing with Postman

### Step 1 — Signup
```
POST http://localhost:5000/signup
Body (JSON):
{
  "name": "Soban",
  "email": "soban@test.com",
  "password": "123456"
}
```

### Step 2 — Login
```
POST http://localhost:8080/login
Body (JSON):
{
  "email": "soban@test.com",
  "password": "123456"
}
```
Copy the `token` from response.

### Step 3 — Use Token in Protected Routes
```
Headers:
Authorization: Bearer <your_token_here>
```

### Step 4 — Create Task
```
POST http://localhost:5000/api/tasks
Headers: Authorization: Bearer <token>
Body (JSON):
{
  "title": "Design Logo",
  "description": "Client ka logo banana hai",
  "deadline": "2026-06-01"
}
```

---

## Features

- JWT based authentication
- Role based access control (Admin / User)
- Users can only access their own tasks
- Admin can view and manage all users and tasks
- Password reset via email
- Welcome email on signup
- Pagination on list endpoints
- Request validation
- Global error handling
- Clean MVC folder structure

Task Management API
This is a task management REST API built using Node.js, Express.js, and MongoDB. It provides functionality for creating, reading, updating, and deleting tasks, and includes basic validation and authentication middleware.

Features
CRUD Operations for managing tasks (Create, Read, Update, Delete)
Input Validation using express-validator
Authentication Middleware for user access control (can be added later)
Task Priorities: Low, Medium, High
Task Statuses: Todo, In Progress, Completed
Due Date for tasks
Getting Started
Prerequisites

Node.js installed on your machine. If you don't have it installed, you can get it from here.
MongoDB instance or use MongoDB Atlas for cloud-based MongoDB.

Postman or any other API client to test the API.
Installation

cd WS-ASSIGNMENT
Install dependencies
npm install
Set up environment variables
Create a .env file in the root of your project and add the following:

PORT=4000
MONGO_URI=your_mongo_db_connection_string

Run the app
npm start
The API should now be running on http://localhost:4000.

API Endpoints
Task Endpoints
1. Create a Task (POST /api/v1/tasks)
Creates a new task. The body should include:

json
Copy code
{
  "title": "Task title",
  "description": "Task description",
  "priority": "LOW",
  "status": "TODO",
  "duoDate": 1672531199000
}
Valid values for priority: LOW, MEDIUM, HIGH
Valid values for status: TODO, IN_PROGRESS, COMPLETED
The duoDate should be a Unix timestamp.

2. Get All Tasks (GET /api/v1/tasks)
Retrieves all tasks.

3. Get Single Task (GET /api/v1/tasks/:id)
Retrieves a single task by its ID.

4. Update a Task (PUT /api/v1/tasks/:id)
Updates an existing task by its ID. The body should include any updated fields (title, description, status, priority, or duoDate).

json
Copy code
{
  "status": "IN_PROGRESS",
  "priority": "MEDIUM"
}
5. Delete a Task (DELETE /api/v1/tasks/:id)
Deletes a task by its ID.

User Endpoints
1. Create a User (POST /api/v1/user)
Create a new user.

2. Get User Info (GET /api/v1/user/:id)
Get information about the user by their ID.

Middleware
1. Authentication Middleware (isAuthenticated)
This middleware is designed to protect routes that require authentication. It ensures that only authenticated users can access certain API routes.

Database Schema
Task Schema
js
Copy code
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["TODO", "IN_PROGRESS", "COMPLETED"] },
  priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"] },
  duoDate: { type: Number }
}, { timestamps: true });
title: The title of the task (Required)
description: Optional description for the task
status: The current status of the task (Todo, In Progress, or Completed)
priority: The priority of the task (Low, Medium, High)
duoDate: The due date (Unix timestamp)
Technologies Used
Node.js: JavaScript runtime for building the server.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database to store tasks.
Mongoose: ODM for MongoDB, to interact with the database using models and schemas.
dotenv: For loading environment variables from the .env file.
express-validator: For validating and sanitizing input data in the requests.
Future Enhancements
User Authentication: Integrating JWT-based authentication for user registration, login, and role-based access control.
Pagination: Add pagination support for the GET tasks endpoint.
Task Assignment: Add functionality to assign tasks to specific users.
File Uploads: Implement file upload functionality for attaching files to tasks.



User Authentication
1. Register a User (POST /api/v1/user/register)
Registers a new user. Requires the following data in the request body:

json
Copy code
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
fullName: Full name of the user (required)
email: Email address (required, must be valid)
password: Password (required, must be at least 6 characters)
2. Login a User (POST /api/v1/user/login)
Logs in an existing user. Requires the following data in the request body:

json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
email: Email address (required)
password: Password (required)
On successful login, a JWT token will be returned and stored in an httpOnly cookie.

3. Logout (GET /api/v1/user/logout)
Logs out the user by clearing the JWT token cookie.

Returns a message indicating successful logout.

Task Management
1. Create a Task (POST /api/v1/tasks)
Creates a new task. Requires the following data in the request body:

json
Copy code
{
  "title": "Task title",
  "description": "Task description",
  "priority": "LOW",
  "status": "TODO",
  "duoDate": 1672531199000
}
title: Title of the task (required)
description: Description of the task (optional)
priority: Task priority (LOW, MEDIUM, or HIGH)
status: Task status (TODO, IN_PROGRESS, COMPLETED)
duoDate: Due date in Unix timestamp format (required)
2. Get All Tasks (GET /api/v1/tasks)
Retrieves all tasks.

3. Get a Single Task (GET /api/v1/tasks/:id)
Retrieves a specific task by its ID.

4. Update a Task (PUT /api/v1/tasks/:id)
Updates a task by its ID. You can update any of the following fields:

json
Copy code
{
  "status": "IN_PROGRESS",
  "priority": "MEDIUM"
}
5. Delete a Task (DELETE /api/v1/tasks/:id)
Deletes a task by its ID.

Database Schema
User Schema
js
Copy code
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });
Task Schema
js
Copy code
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["TODO", "IN_PROGRESS", "COMPLETED"] },
  priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"] },
  duoDate: { type: Number }
}, { timestamps: true });
Technologies Used
Node.js: JavaScript runtime for the server.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database for storing users and tasks.
Mongoose: ODM for MongoDB, to define models and interact with the database.
Bcryptjs: Used for hashing passwords before storing them.
JWT: JSON Web Tokens used for user authentication.
Express Validator: For validating and sanitizing user input in API requests.
dotenv: Loads environment variables from a .env file.
Middleware
1. Authentication Middleware
This middleware checks if the request contains a valid JWT token and verifies the user's identity before allowing access to protected routes.

2. Input Validation Middleware
Validates input fields using express-validator to ensure that the data is correct (e.g., email format, password length, etc.).

How to Test the API
You can test the API using an API client like Postman or Insomnia.

Steps to test:
Register a User:

Make a POST request to /api/v1/user/register with valid data.
Example:
json
Copy code
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Login a User:

Make a POST request to /api/v1/user/login with valid credentials.
Example:
json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
The response will include a JWT token stored in an httpOnly cookie.
Create a Task:

After logging in, make a POST request to /api/v1/tasks to create a new task.
Logout:

Make a GET request to /api/v1/user/logout to clear the authentication cookie and log out.

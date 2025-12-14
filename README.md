# Employee Management System

A full-stack Employee Management application built with React, Node.js/Express, and MongoDB.

## Features

### Backend (Node.js + Express + Mongoose)
- **Employee Model**: name, surname, email, role (employee/admin), department, position, salary (base, kpiPercent, bonus, penalty)
- **CRUD API Endpoints**:
  - GET /api/users → fetch all employees
  - POST /api/users → add a new employee
  - PUT /api/users/:id → update an employee
  - DELETE /api/users/:id → delete an employee
- **Full Validation**: Express-validator for request validation
- **Error Handling**: Proper error responses for all scenarios
- **MongoDB Connection**: Connects to MongoDB with CORS and JSON middleware

### Frontend (React + Ant Design)
- **Employees Page**: Complete employee management interface
- **Employee Table**: Displays all employees with actions
- **Add/Edit Modal**: Form for adding and editing employees
- **Stat Cards**: Shows total employees, admins, total salary, and average salary
- **Full API Integration**: Uses axios to communicate with backend
- **Form Validation**: Ant Design form validation
- **Error Handling**: Displays errors using Ant Design message component

## Project Structure

```
/
├── adminPanel/          # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── Employees.jsx    # Main employee management page
│   │   ├── components/
│   │   │   ├── EmployeeTable.jsx # Employee table component
│   │   │   └── StatCard.jsx      # Statistics card component
│   │   └── api.js              # API service for backend communication
│   └── package.json
│
└── server/              # Node.js Backend
    ├── src/
    │   ├── models/
    │   │   └── user.js           # Employee model
    │   ├── controllers/
    │   │   └── user.controller.js # User controller
    │   ├── routes/
    │   │   └── user.routes.js    # API routes
    │   ├── middleware/
    │   │   └── validate.js       # Validation middleware
    │   └── app.js              # Express app configuration
    ├── server.js            # Server entry point
    └── package.json
```

## Setup Instructions

### 1. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd adminPanel
npm install
```

### 2. Configure Environment

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/employee-db?retryWrites=true&w=majority
```

### 3. Run the Application

#### Start Backend
```bash
cd server
npm run dev
```

#### Start Frontend
```bash
cd adminPanel
npm run dev
```

The application will be available at:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## API Documentation

### Get All Employees
```
GET /api/users
```

**Response**: Array of employee objects

### Create Employee
```
POST /api/users
```

**Request Body**:
```json
{
  "name": "John",
  "surname": "Doe",
  "email": "john@example.com",
  "role": "employee",
  "position": "Developer",
  "department": "IT",
  "salary": {
    "base": 5000,
    "kpiPercent": 10,
    "bonus": 500,
    "penalty": 0
  }
}
```

**Response**: Created employee object

### Update Employee
```
PUT /api/users/:id
```

**Request Body**: Same as create, but only fields to update are required

**Response**: Updated employee object

### Delete Employee
```
DELETE /api/users/:id
```

**Response**: Success message

## Validation Rules

### Create/Update Employee Validation
- `name`: Required, non-empty string
- `surname`: Required, non-empty string
- `email`: Required, valid email format
- `role`: Optional, must be either "employee" or "admin"
- `salary.base`: Optional, must be a number
- `salary.kpiPercent`: Optional, must be a number
- `salary.bonus`: Optional, must be a number
- `salary.penalty`: Optional, must be a number

## Error Handling

The application handles errors gracefully:
- **400 Bad Request**: Validation errors or invalid data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

Errors are displayed to users using Ant Design's `message` component.

## Testing

To test the application:

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173` in your browser
3. Use the interface to:
   - Add new employees
   - Edit existing employees
   - Delete employees
   - View employee statistics

## Troubleshooting

### Common Issues

**Issue: POST 400 errors**
- Ensure all required fields are filled
- Check that email is in valid format
- Verify salary fields are numbers

**Issue: Salary undefined**
- The frontend properly handles salary as an object with default values
- Backend ensures salary fields default to 0 if not provided

**Issue: MongoDB connection failed**
- Verify your `.env` file has correct MongoDB URI
- Ensure MongoDB service is running

**Issue: CORS errors**
- The backend has CORS enabled by default
- Ensure frontend is running on `http://localhost:5173`

## Deployment

### Backend Deployment
1. Build for production: `npm run build`
2. Deploy to platforms like:
   - Heroku
   - Render
   - AWS
   - DigitalOcean

### Frontend Deployment
1. Build for production: `npm run build`
2. Deploy static files to:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3

## License

This project is for educational purposes.

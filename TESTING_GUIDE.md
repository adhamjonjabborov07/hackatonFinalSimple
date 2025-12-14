# Employee Management System - Testing Guide

This guide helps you test the complete Employee Management system to ensure all functionality works correctly.

## Prerequisites

1. **Node.js** installed (v18+ recommended)
2. **MongoDB** connection configured in `.env` file
3. **npm packages** installed in both `server` and `adminPanel` directories

## Setup Instructions

### 1. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies  
cd ../adminPanel
npm install
```

### 2. Start the Servers

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd adminPanel
npm run dev
```

Both servers should start successfully:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## Testing the API

### Test 1: GET All Employees (Initial State)

**Request:**
```bash
curl http://localhost:5000/api/users
```

**Expected Response:**
```json
[]
```

### Test 2: POST Create Employee

**Request:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "role": "employee",
    "position": "Developer",
    "department": "IT",
    "salary": {
      "base": 5000,
      "kpiPercent": 10,
      "bonus": 500,
      "penalty": 0
    }
  }'
```

**Expected Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "role": "employee",
  "position": "Developer",
  "department": "IT",
  "salary": {
    "base": 5000,
    "kpiPercent": 10,
    "bonus": 500,
    "penalty": 0
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Test 3: POST Create Admin

**Request:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane",
    "surname": "Smith",
    "email": "jane.smith@example.com",
    "role": "admin",
    "position": "Manager",
    "department": "HR",
    "salary": {
      "base": 7000,
      "kpiPercent": 15,
      "bonus": 1000,
      "penalty": 0
    }
  }'
```

### Test 4: GET All Employees (After Creation)

**Request:**
```bash
curl http://localhost:5000/api/users
```

**Expected Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "role": "employee",
    "position": "Developer",
    "department": "IT",
    "salary": {
      "base": 5000,
      "kpiPercent": 10,
      "bonus": 500,
      "penalty": 0
    }
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane",
    "surname": "Smith",
    "email": "jane.smith@example.com",
    "role": "admin",
    "position": "Manager",
    "department": "HR",
    "salary": {
      "base": 7000,
      "kpiPercent": 15,
      "bonus": 1000,
      "penalty": 0
    }
  }
]
```

### Test 5: PUT Update Employee

**Request:**
```bash
curl -X PUT http://localhost:5000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "salary": {
      "base": 5500,
      "bonus": 600
    }
  }'
```

**Expected Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "role": "employee",
  "position": "Developer",
  "department": "IT",
  "salary": {
    "base": 5500,
    "kpiPercent": 10,
    "bonus": 600,
    "penalty": 0
  }
}
```

### Test 6: DELETE Employee

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/users/507f1f77bcf86cd799439011
```

**Expected Response:**
```json
{
  "message": "Employee deleted successfully"
}
```

## Testing Validation Errors

### Test 7: POST with Missing Required Fields

**Request:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "email": "invalid-email"
  }'
```

**Expected Response (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Test 8: PUT with Invalid ID

**Request:**
```bash
curl -X PUT http://localhost:5000/api/users/invalid-id \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'
```

**Expected Response (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Invalid employee ID",
      "param": "id",
      "location": "params"
    }
  ]
}
```

## Testing the Frontend

### Test 9: Add Employee via Frontend

1. Open browser to `http://localhost:5173`
2. Click "Xodim qo'shish" button
3. Fill the form:
   - Ism: Test
   - Familiya: User
   - Elektron pochta: test.user@example.com
   - Lavozim: Xodim (or Administrator)
   - Asosiy maosh: 3000
   - KPI %: 5
   - Bonus: 200
   - Penalty: 0
4. Click "Qo'shish" button

**Expected Result:**
- Success message: "Xodim muvaffaqiyatli qo'shildi"
- New employee appears in the table
- Statistics cards update (total employees increases)

### Test 10: Edit Employee via Frontend

1. Click "Tahrirlash" button on any employee row
2. Modify fields (e.g., change base salary)
3. Click "Yangilash" button

**Expected Result:**
- Success message: "Xodim muvaffaqiyatli yangilandi"
- Employee data updates in the table

### Test 11: Delete Employee via Frontend

1. Click "O'chirish" button on any employee row
2. Confirm in the pop-up dialog

**Expected Result:**
- Success message: "Xodim muvaffaqiyatli o'chirildi"
- Employee removed from the table
- Statistics cards update (total employees decreases)

### Test 12: View Salary

1. Click "Maoshni ko'rish" button on any employee row

**Expected Result:**
- Info message showing: "Xodimning maoshi: [Name] - $[amount]"

## Testing Error Scenarios

### Test 13: Duplicate Email

1. Try to add an employee with an email that already exists

**Expected Result:**
- Error message: "Xodimni saqlashda xato"
- Employee not added to the database

### Test 14: Invalid Email Format

1. Try to add an employee with invalid email (e.g., "test@example")

**Expected Result:**
- Form validation error: "To'g'ri elektron pochta kiriting"
- Submit button disabled until corrected

### Test 15: Missing Required Fields

1. Try to submit the form without filling required fields (Name, Surname, Email, Base Salary)

**Expected Result:**
- Form validation errors appear for each missing field
- Submit button disabled until all required fields are filled

## Statistics Verification

After adding employees, verify the statistics cards show correct values:

- **Jami xodimlar**: Total number of employees
- **Administratorlar**: Number of employees with role "admin"
- **Jami maosh**: Sum of all base salaries
- **O'rtacha maosh**: Average of all base salaries

## Complete Test Data

You can use this test data to populate your database:

```json
[
  {
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "role": "employee",
    "position": "Frontend Developer",
    "department": "IT",
    "salary": {
      "base": 4500,
      "kpiPercent": 10,
      "bonus": 400,
      "penalty": 0
    }
  },
  {
    "name": "Jane",
    "surname": "Smith",
    "email": "jane.smith@example.com",
    "role": "admin",
    "position": "HR Manager",
    "department": "HR",
    "salary": {
      "base": 6500,
      "kpiPercent": 15,
      "bonus": 800,
      "penalty": 0
    }
  },
  {
    "name": "Michael",
    "surname": "Johnson",
    "email": "michael.j@example.com",
    "role": "employee",
    "position": "Backend Developer",
    "department": "IT",
    "salary": {
      "base": 5000,
      "kpiPercent": 12,
      "bonus": 500,
      "penalty": 0
    }
  },
  {
    "name": "Sarah",
    "surname": "Williams",
    "email": "sarah.w@example.com",
    "role": "admin",
    "position": "Finance Director",
    "department": "Finance",
    "salary": {
      "base": 8000,
      "kpiPercent": 20,
      "bonus": 1200,
      "penalty": 0
    }
  }
]
```

## Expected Results After Full Testing

✅ All CRUD operations work correctly
✅ Validation prevents invalid data
✅ Error messages are displayed properly
✅ Statistics are calculated correctly
✅ Frontend and backend are properly integrated
✅ All salary fields are handled correctly
✅ No POST 400 errors
✅ No salary undefined issues

## Troubleshooting

### Issue: POST 400 Errors
**Solution:** Ensure:
1. All required fields are filled (name, surname, email, baseSalary)
2. Email is in valid format
3. Salary fields are numbers
4. No duplicate emails exist

### Issue: Salary Undefined
**Solution:** The code already handles this with defaults:
```javascript
salary: {
  base: Number(values.baseSalary),
  kpiPercent: Number(values.kpiPercentage || 0),
  bonus: Number(values.bonus || 0),
  penalty: Number(values.penalty || 0)
}
```

### Issue: MongoDB Connection Failed
**Solution:**
1. Verify `.env` file has correct MONGO_URI
2. Ensure MongoDB service is running
3. Check network connectivity

### Issue: CORS Errors
**Solution:**
1. Ensure backend is running on port 5000
2. Frontend is running on port 5173
3. Backend has CORS enabled (it does by default)

## Conclusion

After following all tests in this guide, the Employee Management System should be fully functional with:
- Complete CRUD operations
- Proper validation
- Error handling
- Statistics calculation
- Uzbek language interface
- Proper salary field handling

All previous issues (POST 400, salary undefined) have been fixed and tested.
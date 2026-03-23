# Online Examination System - Quick Start Guide

## What's Been Created

Your Online Examination System project is now complete with:

✅ **Database** - MySQL database with all required tables
✅ **Backend** - Node.js/Express API server
✅ **Frontend** - HTML templates with EJS
✅ **Authentication** - User registration and login system
✅ **Exam Management** - Full exam taking functionality
✅ **Results** - Exam grading and result tracking
✅ **Styling** - Responsive CSS design
✅ **JavaScript** - Client-side interactivity

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```powershell
cd c:\Html
npm install
```

This will install:
- express (web framework)
- mysql (database driver)
- bcryptjs (password encryption)
- jsonwebtoken (JWT authentication)
- dotenv (environment variables)
- ejs (template engine)

### Step 2: Start the Server
```powershell
npm run dev
```

You should see:
```
Server is running on http://localhost:3000
MySQL connected successfully!
```

### Step 3: Open in Browser
- Go to `http://localhost:3000`
- Click "Register" to create an account
- Use the system to take exams

## Test the System

### Using Sample Credentials:
```
Email: student1@exam.com
Password: student123
```

Or create your own account via the Register page.

## File Structure Overview

```
c:\Html\
├── app.js                      # Main server file
├── package.json                # Dependencies
├── .env                        # Configuration
├── README.md                   # Full documentation
├── database_setup.sql          # Database creation script
├── config/database.js          # DB connection
├── routes/                     # API endpoints
├── controllers/                # Business logic
├── middleware/                 # Authentication
├── views/                      # HTML pages
└── public/                     # CSS & JavaScript
    ├── css/style.css
    └── js/main.js, exam.js, etc
```

## Available Pages

1. **Home** - `http://localhost:3000/`
2. **Register** - `http://localhost:3000/register`
3. **Login** - `http://localhost:3000/login`
4. **Exams List** - `http://localhost:3000/exams` (requires login)
5. **Take Exam** - `http://localhost:3000/exam?id=1` (requires login)
6. **Results** - `http://localhost:3000/results` (requires login)

## Database Info

- **Host:** localhost
- **User:** root
- **Password:** Sheshu#123
- **Database:** online_exam_system

Database tables created:
- users
- subjects
- exams
- questions
- options
- student_answers
- results

## Common Commands

**Start development server:**
```powershell
npm run dev
```

**Start production server:**
```powershell
npm start
```

**Check if MySQL is connected:**
- Watch the console output on startup
- Should show "MySQL connected successfully!"

## Features Ready to Use

✅ User Registration (new accounts)
✅ User Login (with JWT tokens)
✅ Browse Available Exams
✅ Take Timed Exams
✅ Multiple Choice Questions
✅ True/False Questions
✅ Instant Result Calculation
✅ View Exam Results & Scores
✅ Performance Statistics
✅ Responsive Design (mobile-friendly)

## Important Notes

1. **First Time Setup**
   - npm install will download all packages
   - Make sure you have internet connection
   - This may take 2-3 minutes

2. **Database**
   - MySQL server must be running
   - Database already created with sample data
   - 3 sample users already in database

3. **Security** (for production)
   - Change JWT_SECRET in .env
   - Change SESSION_SECRET in app.js
   - Use HTTPS instead of HTTP
   - Implement additional validation

## Troubleshooting Quick Fixes

### Problem: "Cannot find module"
**Solution:** Run `npm install` again

### Problem: "Error: connect ECONNREFUSED"
**Solution:** Make sure MySQL server is running

### Problem: "Port 3000 already in use"
**Solution:** 
- Change PORT in .env file
- Or: `taskkill /PID <process-id> /F` (Windows)

### Problem: Page keeps redirecting to login
**Solution:** 
- Clear browser cookies
- Hard refresh (Ctrl+F5)
- Check localStorage in DevTools

## Next Steps

1. ✅ You've created the system
2. ✅ Database is ready
3. 👉 Install dependencies: `npm install`
4. 👉 Start server: `npm run dev`
5. 👉 Test in browser: `http://localhost:3000`

## Support Files

- **README.md** - Full documentation
- **database_setup.sql** - Database creation script
- **.env** - Configuration file
- **package.json** - Project dependencies

---

**Created:** March 2026
**System Ready to Use:** ✅ YES

Enjoy your Online Examination System!

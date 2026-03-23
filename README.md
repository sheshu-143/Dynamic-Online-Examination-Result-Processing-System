# Online Examination System

A complete Node.js/Express based online examination platform with MySQL database integration.

## Features

- **User Authentication**: Secure login and registration system
- **Exam Management**: Create, manage, and take exams
- **Question Types**: Support for MCQ, True/False questions
- **Timed Exams**: Timer countdown for exam duration
- **Instant Results**: Immediate grading and result display
- **Performance Analytics**: Track exam performance and statistics
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure

```
Online Examination System/
├── app.js                    # Main Express application
├── package.json              # Node.js dependencies
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── config/
│   └── database.js          # Database connection configuration
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── examRoutes.js        # Exam routes
│   └── resultRoutes.js      # Result routes
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── examController.js    # Exam logic
│   └── resultController.js  # Result logic
├── middleware/
│   └── authMiddleware.js    # JWT authentication middleware
├── views/
│   ├── index.ejs            # Home page
│   ├── login.ejs            # Login page
│   ├── register.ejs         # Registration page
│   ├── exams.ejs            # Exams list page
│   ├── exam.ejs             # Exam taking page
│   └── results.ejs          # Results page
└── public/
    ├── css/
    │   └── style.css        # Main styles
    └── js/
        ├── main.js          # Main JavaScript
        ├── exams.js         # Exams page script
        ├── exam.js          # Exam page script
        └── results.js       # Results page script
```

## Database Setup

The MySQL database is already configured with the following tables:
- `users` - Student and admin accounts
- `subjects` - Exam subjects
- `exams` - Exam details
- `questions` - Exam questions
- `options` - Answer options for MCQs
- `student_answers` - Student responses
- `results` - Exam results and scores

**Database Credentials:**
- Host: `localhost`
- User: `root`
- Password: `Sheshu#123`
- Database: `online_exam_system`

## Installation & Setup

### 1. Install Node.js Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

The `.env` file is already configured with:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Sheshu#123
DB_NAME=online_exam_system
PORT=3000
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

### 3. Start the Server

**Development Mode (with auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes `/api/auth`
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /logout` - Logout user
- `GET /me` - Get current user info

### Exam Routes `/api/exams`
- `GET /` - Get all published exams
- `GET /:id` - Get exam details
- `GET /:id/questions` - Get exam questions
- `POST /:id/submit` - Submit exam answers (requires authentication)
- `POST /create` - Create new exam (admin only)

### Result Routes `/api/results`
- `GET /my-results` - Get student's results (requires authentication)
- `GET /:id` - Get specific result details (requires authentication)
- `GET /admin/all-results` - Get all results (admin only)

## Usage

### 1. Register a New Account
- Navigate to `/register`
- Fill in your details
- Click "Register"

### 2. Login
- Go to `/login`
- Enter your credentials
- Click "Login"

### 3. Take an Exam
- Go to `/exams`
- Select an exam
- Click "Start Exam"
- Answer all questions
- Monitor the timer
- Click "Submit Exam"

### 4. View Results
- Go to `/results`
- View all your exam results
- Click "View" to see detailed results

## Sample Test Credentials

**Admin Account:**
- Username: `admin`
- Email: `admin@exam.com`
- Password: `admin@123`

**Student Account:**
- Username: `student1`
- Email: `student1@exam.com`
- Password: `student123`

## Security Considerations

1. **Change JWT Secret**: Update `JWT_SECRET` in `.env` file
2. **Change Session Secret**: Update session secret in `app.js`
3. **Use HTTPS**: In production, always use HTTPS
4. **Password Hashing**: Passwords are hashed using bcryptjs
5. **Token Expiration**: JWT tokens expire after 24 hours

## Development Tips

1. Use the browser's Network tab in DevTools to debug API requests
2. Check browser Console for JavaScript errors
3. Check server logs for backend errors
4. Use the Question Navigator to jump between questions during exams
5. The timer automatically submits the exam when time is up

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check credentials in `.env` file
- Verify database exists: `online_exam_system`

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the port

### Session/Login Issues
- Clear browser cookies
- Check if JWT_SECRET is set correctly
- Ensure token is being stored in localStorage

## Future Enhancements

- Admin dashboard for exam management
- Question bank management
- Detailed analytics and reports
- PDF result export
- Email notifications
- Two-factor authentication
- Plagiarism detection
- Question image support

## Support

For issues or questions, please check the error messages in the browser console and server logs.

## License

ISC

---

**Created:** March 2026
**Last Updated:** March 5, 2026

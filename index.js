const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const AwlModel = require('./models/AwlModel');

const app = express()
const allowedOrigins = ['https://66bc56186652184c2bb2efba--teal-yeot-b589c2.netlify.app','https://teal-yeot-b589c2.netlify.app','http://localhost:3001','http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        const msg = 'The CORS policy does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    credentials: true // Allow credentials (cookies) to be sent
}));

// Backend example (Express)
app.post('/api/signin', async (req, res) => {
    // Authenticate user and generate token
    const token = generateToken(user); // Replace with your token generation logic
  
    // Set token in cookies
    res.cookie('token', token, { httpOnly: true, secure: false }); // Ensure `secure` is true in production
    res.json({ success: true, message: 'Logged in successfully' });
  });
  

app.use(express.json())
app.use(cookieParser())

app.use("/api", router)

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    console.log('Cookies: ', req.cookies);
    next();
});


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connect to DB")
        console.log("Server is running" + PORT)
    })
})

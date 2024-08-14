const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const AwlModel = require('./models/AwlModel');

const app = express()
const allowedOrigins = ['https://66bc56186652184c2bb2efba--teal-yeot-b589c2.netlify.app/'];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api", router)

const PORT = 8080 || process.env.PORT


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connect to DB")
        console.log("Server is running" + PORT)
    })
})

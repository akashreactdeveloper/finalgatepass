const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');

const app = express();
const allowedOrigins = [
    'https://66bc56186652184c2bb2efba--teal-yeot-b589c2.netlify.app',
    'https://teal-yeot-b589c2.netlify.app',
    'http://localhost:3001'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error("CORS policy does not allow access from the specified Origin."), false);
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
});

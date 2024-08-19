const jwt = require('jsonwebtoken');

// Define your token generation function
function generateToken(user) {
    const payload = { _id: user._id, email: user.email };
    const secret = process.env.TOKEN_SECRET_KEY;
    const options = { expiresIn: '8h' };
    return jwt.sign(payload, secret, options);
}

module.exports = generateToken;

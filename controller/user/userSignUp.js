const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require('jsonwebtoken');

async function userSigninController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User doesn't exist!");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = { _id: user._id, email: user.email };
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
            }).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            });

        } else {
            throw new Error("Invalid password!");
        }

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSigninController;

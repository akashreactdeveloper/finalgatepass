const userModel = require('../../models/userModel');

async function userDetailsController(req, res) {
    try {
        // Check if userId is present in the request
        if (!req.userId) {
            return res.status(401).json({
                message: "User not authenticated",
                error: true,
                success: false
            });
        }

        // Find the user by ID
        const user = await userModel.findById(req.userId);

        // If the user is not found, return a 404 response
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // If the user is found, return the user details
        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User Detail"
        });

    } catch (err) {
        // Handle any errors
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;

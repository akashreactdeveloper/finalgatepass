const express = require('express');
const router = express.Router();
const userSignUpController = require("../controller/user/userSignUpController");
const userSigninController = require('../controller/user/userSigninController');
const userDetailsController = require('../controller/user/userDetailsController');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const AwlformDataController = require('../controller/awlForm/AwlFormDataController');
const getAwlGatepassController = require('../controller/awlForm/getAwlGatepassController');
const CategoryGatepass = require('../controller/awlForm/CategoryGatepassController');

router.post("/signup", userSignUpController);
router.post("/signin", userSigninController);
router.get("/user-details", authToken, userDetailsController); // Auth middleware applied
router.get("/userLogout", userLogout);

// Admin Panel
router.get("/all-users", allUsers);
router.post("/update-user", updateUser);

// Generate Awl Gatepass
router.post("/Awl-formdata", AwlformDataController);
router.get("/get-AwlGatepass", getAwlGatepassController);
router.get("/gatepass-type", CategoryGatepass);

module.exports = router;

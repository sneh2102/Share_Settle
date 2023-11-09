const express = require('express');

const { signupUser, loginUser ,forgotPassUser, resetPassUser, changeUsername, changePassword, getUser} = require('../Controller/userController');
const { createGroup, fetchUserGroups, fetchGroup} = require("../Controller/groupController")
const { contactUs} = require('../Controller/contactUsController')

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/forgotpass', forgotPassUser)
router.post('/reset-password/:id/:token', resetPassUser)
router.post('/changeUsername', changeUsername)
router.post('/changePassword', changePassword)
router.get('/getUser', getUser)
router.post("/createGroup", createGroup);
router.post("/fetchUserGroups", fetchUserGroups);
router.post('/contact', contactUs);
router.get("/view/:id", fetchGroup)



module.exports = router;
const express = require('express');

const { signupUser, loginUser ,forgotPassUser, resetPassUser, changeUsername, changePassword, getUser} = require('../Controller/userController');
const { createGroup, fetchUserGroups} = require("../Controller/groupController")

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



module.exports = router;
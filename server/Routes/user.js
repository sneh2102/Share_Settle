const express = require('express');

const { signupUser, loginUser ,forgotPassUser, resetPassUser} = require('../Controller/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/forgotpass', forgotPassUser)
router.post('/reset-password/:id/:token', resetPassUser)

module.exports = router;

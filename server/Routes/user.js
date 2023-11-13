const express = require('express');

const { signupUser, loginUser ,forgotPassUser, resetPassUser, changeUsername, changePassword, getUser} = require('../Controller/userController');
const { createGroup, fetchUserGroups, fetchGroup, groupBalanceSheet} = require("../Controller/groupController")
const { contactUs} = require('../Controller/contactUsController')

const { addExpense , deleteExpense, viewGroupExpense, viewUserExpense} = require('../Controller/expenseController')

const router = express.Router();


router.post("/add", addExpense)
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/forgotpass', forgotPassUser)
router.post('/reset-password/:id/:token', resetPassUser)
router.post('/changeUsername', changeUsername)
router.post('/changePassword', changePassword)
router.get('/getUser', getUser)
router.post('/contact', contactUs);




module.exports = router;
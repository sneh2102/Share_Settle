// Importing the express library for creating a router.
const express = require('express');

// Importing various functions from the userController.
const { signupUser, loginUser ,forgotPassUser, resetPassUser, changeUsername, changePassword, getUser,addCardDetailsToUser} = require('../Controller/userController');

// Creating an instance of an express router.
const router = express.Router();

// Defining routes for different user-related actions and associating them with corresponding controller functions.

// Handling POST requests to '/login' endpoint by invoking the loginUser function.
router.post('/login', loginUser);

// Handling POST requests to '/signup' endpoint by invoking the signupUser function.
router.post('/signup', signupUser);

// Handling POST requests to '/forgotpass' endpoint by invoking the forgotPassUser function.
router.post('/forgotpass', forgotPassUser)

// Handling POST requests to '/reset-password/:id/:token' endpoint by invoking the resetPassUser function.
router.post('/reset-password/:id/:token', resetPassUser)

// Handling POST requests to '/changeUsername' endpoint by invoking the changeUsername function.
router.post('/changeUsername', changeUsername)

// Handling POST requests to '/changePassword' endpoint by invoking the changePassword function.
router.post('/changePassword', changePassword)

// Handling GET requests to '/getUser' endpoint by invoking the getUser function.
router.get('/getUser', getUser)

// Handling POST requests to '/card-details' endpoint by invoking the addCardDetailsToUser function.
router.post('/card-details',addCardDetailsToUser)

// Exporting the router to be used in other parts of the application.
module.exports = router;